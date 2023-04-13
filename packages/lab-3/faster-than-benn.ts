// Import the rawHands
import rawHands from "./poker.json" assert {type: "json"}
import {isWinnerPlayerOne} from "./helper.js";
import {HandDetails, Hands, Suits} from "./types.js";

// Break out the rawHands
const games: Hands[] = rawHands.map(twoHands => {
    const cards = twoHands.split(" ");

    const handDetails: HandDetails[] = [];

    // Grab the 5 cards for each hand
    for (let i=0; i<2; i++) {

        // Create new hand details
        handDetails[i] = {
            hand: []
        };

        // Grab each card for this hand
        for (let j=0; j<5; j++) {
            // Grab the card
            const thisCardString = cards[i * j];

            // Store this card
            handDetails[i]['hand'].push({
                value: Number(thisCardString[0]),
                suit: thisCardString[1] as Suits,
            });
        }
    }

    return {
        player_1: handDetails[0],
        player_2: handDetails[1],
    };
});


// Loop through each game
const playerOneWins = games.filter(hands => {
    return isWinnerPlayerOne(hands);
})

// Share the results
console.log(`Player one wins ${playerOneWins.length} hands`);