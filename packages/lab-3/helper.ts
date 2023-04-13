import {HandDetails, Hands} from "./types.js";

export function isWinnerPlayerOne(hands: Hands): boolean {

    // Handle building each hand's details
    for (const hand of Object.values(hands)) {
        // Determine the primary and secondary rank for each hand
        updateRanks(hand);

        // Determine the highest card in the hand
    }

    return true;
}

/**
 * Determines the primary rank for each hand (e.g. full house, flush, etc.)
 * and the secondary rank for each hand (i.e. the high card for the primary rank)
 * @param handDetails
 */
function updateRanks(handDetails: HandDetails) {



}