// Check for a royal flush
import { hasRoyalFlush } from "./helper.js";
import { FaceValues, Suits } from "./types.js";

let test;
test = hasRoyalFlush([
    {
        value: FaceValues.A,
        suit: Suits.CLUBS,
    },
    {
        value: FaceValues.K,
        suit: Suits.CLUBS,
    },
    {
        value: FaceValues.Q,
        suit: Suits.CLUBS,
    },
    {
        value: FaceValues.J,
        suit: Suits.CLUBS,
    },
    {
        value: FaceValues.T,
        suit: Suits.CLUBS,
    },
]);
console.log('done');
//
// // Check for a four of a kind
// if ((highestCardResult = hasNOfAKind(hand, 4))) {
//     return {
//         primaryRank: HandRankings.FourOfAKind,
//         secondaryRank: highestCardResult,
//     }
// }
//
// // Check for a full house
// if ((highestCardResult = hasFullHouse(hand))) {
//     return {
//         primaryRank: HandRankings.FullHouse,
//         secondaryRank: highestCardResult,
//     }
// }
//
// // Check for a three of a kind
// if ((highestCardResult = hasNOfAKind(hand, 3))) {
//     return {
//         primaryRank: HandRankings.ThreeOfAKind,
//         secondaryRank: highestCardResult,
//     }
// }
//
// // Check for a two pair
// if ((highestCardResult = hasTwoPair(hand))) {
//     return {
//         primaryRank: HandRankings.TwoPairs,
//         secondaryRank: highestCardResult,
//     }
// }
//
// // Check for a pair
// if ((highestCardResult = hasPair(hand))) {
//     return {
//         primaryRank: HandRankings.OnePair,
//         secondaryRank: highestCardResult,
//     }
// }
//
// // Return just the high card
// return {
//     primaryRank: HandRankings.HighCard,
//     secondaryRank: hand[0].value,
// }
