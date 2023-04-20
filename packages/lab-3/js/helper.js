import { FaceValues, HandRankings } from "./types.js";

export function isWinnerPlayerOne(hands) {
  // Handle building each hand's details
  // @ts-ignore
  for (const handDetails of Object.values(hands)) {
    // Store the hand rank
    handDetails.handRank = getHandRank(handDetails.hand);

    // Store the highest cards
    handDetails.handHighCards = new Set();
    handDetails.hand.forEach((card) => {
      handDetails.handHighCards?.add(card.value);
    });
  }

  // Compare each hand's rank
  if (
    hands.player_1.handRank?.primaryRank !==
    hands.player_2.handRank?.primaryRank
  )
    return (
      hands.player_1.handRank?.primaryRank >
      hands.player_2.handRank?.primaryRank
    );

  // Compare each hand's secondary rank
  if (
    hands.player_1.handRank?.secondaryRank !==
    hands.player_2.handRank?.secondaryRank
  )
    return (
      hands.player_1.handRank?.secondaryRank >
      hands.player_2.handRank?.secondaryRank
    );

  // Compare each hand's highest card
  const player1HighCards = [...hands.player_1.handHighCards].sort(
    (a, b) => b - a
  );
  const player2HighCards = [...hands.player_1.handHighCards].sort(
    (a, b) => b - a
  );

  for (
    let i = 0;
    i < Math.min(player1HighCards.length, player2HighCards.length);
    i++
  ) {
    if (hands.player_1.hand[i] !== hands.player_2.hand[i])
      return hands.player_1.hand[i] > hands.player_2.hand[i];
  }

  console.error(hands.player_1, hands.player_2);
  throw new Error("They have the same hand");
}
/**
 * Determines the primary rank for each hand (e.g. full house, flush, etc.)
 * and the secondary rank for each hand (i.e. the high card for the primary rank)
 * @param hand
 */
export function getHandRank(hand) {
  let highestCardResult;

  // Check for a royal flush
  if ((highestCardResult = hasRoyalFlush(hand))) {
    // console.log("Royal Flush");
    return {
      primaryRank: HandRankings.RoyalFlush,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a straight flush
  if ((highestCardResult = hasStraightFlush(hand))) {
    // console.log("Straight Flush");
    return {
      primaryRank: HandRankings.StraightFlush,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a four of a kind
  if ((highestCardResult = hasNOfAKind(hand, 4))) {
    // console.log("4 of a kind");
    return {
      primaryRank: HandRankings.FourOfAKind,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a full house
  if ((highestCardResult = hasFullHouse(hand))) {
    // console.log("Full House");
    return {
      primaryRank: HandRankings.FullHouse,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a flush
  if ((highestCardResult = hasFlush(hand))) {
    // console.log("Flush");
    return {
      primaryRank: HandRankings.Flush,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a straight
  if ((highestCardResult = hasStraight(hand))) {
    // console.log("Straight");
    return {
      primaryRank: HandRankings.Straight,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a three of a kind
  if ((highestCardResult = hasNOfAKind(hand, 3))) {
    // console.log("3 of a kind");
    return {
      primaryRank: HandRankings.ThreeOfAKind,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a two pair
  if ((highestCardResult = hasTwoPair(hand))) {
    // console.log("2 pair");
    return {
      primaryRank: HandRankings.TwoPairs,
      secondaryRank: highestCardResult,
    };
  }

  // Check for a pair
  if ((highestCardResult = hasPair(hand))) {
    // console.log("1 pair");
    return {
      primaryRank: HandRankings.OnePair,
      secondaryRank: highestCardResult,
    };
  }

  // console.log("high card");
  // Return just the high card
  return {
    primaryRank: HandRankings.HighCard,
    secondaryRank: hand[0].value,
  };
}

export function hasPair(hand) {
  const nOfAKinds = getAllNOfAKinds(hand, 2);

  return nOfAKinds?.[0] ?? null;
}

export function hasTwoPair(hand) {
  const nOfAKindsPair1 = getAllNOfAKinds(hand, 2);
  // console.log(`First Pair: ${nOfAKindsPair1}`);
  if (!nOfAKindsPair1) {
    return null;
  }
  const nOfAKindsPair2 = getAllNOfAKinds(hand, 2, nOfAKindsPair1[0]);
  // console.log(`Second Pair: ${nOfAKindsPair2}`);
  return nOfAKindsPair1 && nOfAKindsPair2
    ? [nOfAKindsPair1?.[0], nOfAKindsPair2?.[0]]
    : null;
}

export function hasNOfAKind(hand, n, exclude) {
  const nOfAKinds = getAllNOfAKinds(hand, n, exclude);

  return nOfAKinds?.[0] ?? null;
}

export function hasFullHouse(hand) {
  // Check for a three of a kind
  const hasThreeOfAKindResult = hasNOfAKind(hand, 3);

  // Check for a pair of different suit
  const hasPairResult = hasNOfAKind(hand, 2, hasThreeOfAKindResult);

  return hasThreeOfAKindResult !== null && hasPairResult !== null
    ? Math.max(hasThreeOfAKindResult, hasPairResult)
    : null;
}

export function getAllNOfAKinds(hand, n, exclude) {
  const nOfAKinds = new Set();

  // Loop through each card and determine the number of matching (inefficient, i know)
  for (const baseCard of hand) {
    let numMatching = 0; // Start negative since we'll always match ourselves

    for (const card of hand) {
      // Check if we have a match and that it's not a value of the card we're excluding
      if (exclude) {
        if (baseCard.value === card.value && baseCard.value !== exclude) {
          numMatching++;
        }
      } else {
        if (baseCard.value === card.value) {
          numMatching++;
        }
      }
    }
    // Check if we have enough matches
    if (numMatching >= n) {
      nOfAKinds.add(baseCard.value);
    }
  }
  // Return a sorted (high to low) list of matches
  return nOfAKinds.size ? [...nOfAKinds].sort((a, b) => b - a) : null;
}

export function hasStraight(hand) {
  const startCardValue = hand[0].value;

  // Loop through the cards, they must go in descending order
  for (let i = 0; i < 5; i++) {
    if (hand[i].value !== startCardValue - i) return null;
  }

  return startCardValue;
}

export function hasFlush(hand) {
  // Determine if there is a flush
  let suit = hand[0].suit;
  const hasMismatchSuit = hand.some((card) => suit !== card.suit);

  return !hasMismatchSuit ? hand[0].value : null;
}

export function hasStraightFlush(hand) {
  // Ensure there is a straight
  const highestCardResult = hasStraight(hand);
  if (highestCardResult === null) return null;

  // Determine if there is a flush
  const hasFlushResult = hasFlush(hand);

  return hasFlushResult ? highestCardResult : null;
}

export function hasRoyalFlush(hand) {
  // Check if there is a straight flush
  const highestCardResult = hasStraightFlush(hand);

  // Check if has straight flush and the highest card is an ace
  return highestCardResult === FaceValues.A ? highestCardResult : null;
}

export function getNumberFromValue(value) {
  const numberMap = {
    T: FaceValues.T,
    J: FaceValues.J,
    Q: FaceValues.Q,
    K: FaceValues.K,
    A: FaceValues.A,
  };

  return numberMap[value] ?? Number(value);
}
