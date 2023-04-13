export enum Suits {
    HEART = "H",
    DIAMONDS = "D",
    SPADES = "S",
    CLUBS = "C",
}

export enum FaceValues {
    T = 10,
    J = 11,
    Q = 12,
    K = 13,
    A = 14,

}

export enum HandRankings {
    HighCard = 1,
    OnePair = 2,
    TwoPairs = 3,
    ThreeOfAKind = 4,
    Straight = 5,
    Flush = 6,
    FullHouse = 7,
    FourOfAKind = 8,
    StraightFlush = 9,
    RoyalFlush = 10,
}
export interface Card {
    value: number,
    suit: Suits,
}

export type Hand = [Card, Card, Card, Card, Card];

export interface HandRank {
    primaryRank: number,
    secondaryRank: number,
}
export interface HandDetails {
    hand: Hand,
    handRank?: HandRank,
    handHighCards?: Set<number>,
}

export interface Hands {
    player_1: HandDetails,
    player_2: HandDetails,
}

export type HighestCardResult = number | null;