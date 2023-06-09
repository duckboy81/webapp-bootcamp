import {FaceValues, Hand, HandDetails, HandRank, HandRankings, Hands, HighestCardResult, Suits} from "./types.js";

export function isWinnerPlayerOne(hands: Hands): boolean {

    // Handle building each hand's details
    // @ts-ignore
    for (const handDetails of Object.values<HandDetails>(hands)) {
        // Store the hand rank
        handDetails.handRank = getHandRank(handDetails.hand);

        // Store the highest cards
        handDetails.handHighCards = new Set();
        handDetails.hand.forEach(card => {
            handDetails.handHighCards?.add(card.value);
        });
    }

    // Compare each hand's rank
    if (hands.player_1.handRank?.primaryRank !== hands.player_2.handRank?.primaryRank) return (hands.player_1.handRank?.primaryRank as Number) > (hands.player_2.handRank?.primaryRank as Number);

    // Compare each hand's secondary rank
    if (hands.player_1.handRank?.secondaryRank !== hands.player_2.handRank?.secondaryRank) return (hands.player_1.handRank?.secondaryRank as Number) > (hands.player_2.handRank?.secondaryRank as Number);

    // Compare each hand's highest card
    const player1HighCards = [...hands.player_1.handHighCards!].sort((a, b) => b - a);
    const player2HighCards = [...hands.player_1.handHighCards!].sort((a, b) => b - a);

    for (let i=0; i < Math.min(player1HighCards.length, player2HighCards.length); i++) {
        if (hands.player_1.hand[i] !== hands.player_2.hand[i]) return hands.player_1.hand[i] > hands.player_2.hand[i];
    }

    console.error(hands.player_1, hands.player_2);
    throw new Error('They have the same hand');
}

/**
 * Determines the primary rank for each hand (e.g. full house, flush, etc.)
 * and the secondary rank for each hand (i.e. the high card for the primary rank)
 * @param hand
 */
function getHandRank(hand: Hand): HandRank {

    let highestCardResult: HighestCardResult;

    // Check for a royal flush
    if ((highestCardResult = hasRoyalFlush(hand))) {
        return {
            primaryRank: HandRankings.RoyalFlush,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a straight flush
    if ((highestCardResult = hasStraightFlush(hand))) {
        return {
            primaryRank: HandRankings.StraightFlush,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a four of a kind
    if ((highestCardResult = hasNOfAKind(hand, 4))) {
        return {
            primaryRank: HandRankings.FourOfAKind,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a full house
    if ((highestCardResult = hasFullHouse(hand))) {
        return {
            primaryRank: HandRankings.FullHouse,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a flush
    if ((highestCardResult = hasFlush(hand))) {
        return {
            primaryRank: HandRankings.Flush,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a straight
    if ((highestCardResult = hasStraight(hand))) {
        return {
            primaryRank: HandRankings.Straight,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a three of a kind
    if ((highestCardResult = hasNOfAKind(hand, 3))) {
        return {
            primaryRank: HandRankings.ThreeOfAKind,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a two pair
    if ((highestCardResult = hasTwoPair(hand))) {
        return {
            primaryRank: HandRankings.TwoPairs,
            secondaryRank: highestCardResult,
        }
    }

    // Check for a pair
    if ((highestCardResult = hasPair(hand))) {
        return {
            primaryRank: HandRankings.OnePair,
            secondaryRank: highestCardResult,
        }
    }

    // Return just the high card
    return {
        primaryRank: HandRankings.HighCard,
        secondaryRank: hand[0].value,
    }
}

export function hasPair(hand: Hand): HighestCardResult {
    const nOfAKinds = getAllNOfAKinds(hand, 2);
    return nOfAKinds?.[0] ?? null;
}

export function hasTwoPair(hand: Hand): HighestCardResult {
    const nOfAKinds = getAllNOfAKinds(hand, 2);
    return (nOfAKinds?.length === 2) ? nOfAKinds[0] : null;
}
export function hasNOfAKind(hand: Hand, n: number): HighestCardResult {
    const nOfAKinds = getAllNOfAKinds(hand, n);
    return nOfAKinds?.[0] ?? null;
}

export function hasFullHouse(hand: Hand): HighestCardResult {
    // Check for a three of a kind
    const hasThreeOfAKindResult = hasNOfAKind(hand, 3);

    // Return if no three of a kind
    if (hasThreeOfAKindResult === null) return null;

    // Check for a pair (but not our three of a kind pair)
    const allTwoOfAKinds = getAllNOfAKinds(hand, 2, [hasThreeOfAKindResult]);

    return (allTwoOfAKinds !== null) ? Math.max(hasThreeOfAKindResult, allTwoOfAKinds[0]) : null;
}

export function getAllNOfAKinds(hand: Hand, n: number, excludedNumbers: number[] = []): number[] | null {

    const nOfAKinds = new Set<number>();
    const seenValues: number[] = [];

    // Loop through each card and determine the number of matching (inefficient, i know)
    for (const baseCard of hand) {
        let numMatching = 0;

        // Check if we've already seen this value
        if (seenValues.includes(baseCard.value)) continue;

        // Save the seen value
        seenValues.push(baseCard.value);

        // Check if this card is excluded
        if (excludedNumbers.includes(baseCard.value)) continue;

        for (const card of hand) {
            // Check if we have a match
            if (baseCard.value === card.value) numMatching++;
        }

        // Check if we have enough matches
        if (numMatching >= n) {
            nOfAKinds.add(baseCard.value);
        }
    }

    // Return a sorted (high to low) list of matches
    return (nOfAKinds.size) ? [...nOfAKinds].sort((a,b) => b-a) : null;
}

export function hasStraight(hand: Hand): HighestCardResult {

    const startCardValue = hand[0].value;

    // Loop through the cards, they must go in descending order
    for (let i=0; i<5; i++) {
        if (hand[i].value !== startCardValue - i) return null;
    }

    return startCardValue;
}

export function hasFlush(hand: Hand): HighestCardResult {
    // Determine if there is a flush
    let suit: Suits = hand[0].suit;
    const hasMismatchSuit = hand.some(card => suit !== card.suit);

    return (!hasMismatchSuit) ? hand[0].value : null;
}

export function hasStraightFlush(hand: Hand): HighestCardResult {
    // Ensure there is a straight
    const highestCardResult = hasStraight(hand);
    if (highestCardResult === null) return null;

    // Determine if there is a flush
    const hasFlushResult = hasFlush(hand);

    return (hasFlushResult) ? highestCardResult : null;
}

export function hasRoyalFlush(hand: Hand): HighestCardResult {

    // Check if there is a straight flush
    const highestCardResult = hasStraightFlush(hand);

    // Check if there is a straight flush and the highest card is an ace
    return (highestCardResult === FaceValues.A) ? highestCardResult : null;
}

export function getNumberFromValue(value: string): number {

    const numberMap: Record<string, number> = {
        "T": FaceValues.T,
        "J": FaceValues.J,
        "Q": FaceValues.Q,
        "K": FaceValues.K,
        "A": FaceValues.A,
    }

    return numberMap[value] ?? Number(value);

}