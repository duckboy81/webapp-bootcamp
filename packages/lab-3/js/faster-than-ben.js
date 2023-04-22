// Import the rawHands
import rawHands from "../poker.json" assert { type: "json" };
import { getNumberFromValue, isWinnerPlayerOne } from "./helper.js";

// Break out the rawHands
const games = rawHands.map(twoHands => {

    const cardStrings = twoHands.split(" ");
    const handDetails = [];

    // Grab the 5 cards for each hand
    for (let i = 0; i < 2; i++) {
        // Save the hands
        const cards = [];

        // Grab each card for this hand
        for (let j = 0; j < 5; j++) {

            // Grab the card
            const thisCardString = cardStrings[i * 5 + j];

            // Store this card
            cards.push({
                value: getNumberFromValue(thisCardString[0]),
                suit: thisCardString[1],
            });
        }

        handDetails[i] = {
            hand: cards
        };

        // Sort the hand
        handDetails[i]["hand"].sort((a, b) => {
            return b.value - a.value;
        });
    }

    const hands = {
        player_1: handDetails[0],
        player_2: handDetails[1],
    };

    return hands;
});

// Loop through each game
const playerOneWins = games.filter(hands => {
    return isWinnerPlayerOne(hands);
});

// Share the results
console.log(`Player one wins ${playerOneWins.length} hands`);
console.log(`Player two wins ${games.length - playerOneWins.length} hands`);
