export enum Suits {
    HEART = "H",
    DIAMONDS = "D",
    SPADES = "S",
    CLUBS = "C",
}
interface Card {
    value: number,
    suit: Suits,
}

export interface HandDetails {
    hand: Card[],
    primaryRank?: number,
    secondaryRank?: number,
    highestCard?: number,
}

export interface Hands {
    player_1: HandDetails,
    player_2: HandDetails,
}