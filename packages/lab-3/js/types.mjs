export var Suits;
(function (Suits) {
    Suits["HEART"] = "H";
    Suits["DIAMONDS"] = "D";
    Suits["SPADES"] = "S";
    Suits["CLUBS"] = "C";
})(Suits = Suits || (Suits = {}));

export var FaceValues;
(function (FaceValues) {
    FaceValues[FaceValues["T"] = 10] = "T";
    FaceValues[FaceValues["J"] = 11] = "J";
    FaceValues[FaceValues["Q"] = 12] = "Q";
    FaceValues[FaceValues["K"] = 13] = "K";
    FaceValues[FaceValues["A"] = 14] = "A";
})(FaceValues = FaceValues || (FaceValues = {}));

export var HandRankings;
(function (HandRankings) {
    HandRankings[HandRankings["HighCard"] = 1] = "HighCard";
    HandRankings[HandRankings["OnePair"] = 2] = "OnePair";
    HandRankings[HandRankings["TwoPairs"] = 3] = "TwoPairs";
    HandRankings[HandRankings["ThreeOfAKind"] = 4] = "ThreeOfAKind";
    HandRankings[HandRankings["Straight"] = 5] = "Straight";
    HandRankings[HandRankings["Flush"] = 6] = "Flush";
    HandRankings[HandRankings["FullHouse"] = 7] = "FullHouse";
    HandRankings[HandRankings["FourOfAKind"] = 8] = "FourOfAKind";
    HandRankings[HandRankings["StraightFlush"] = 9] = "StraightFlush";
    HandRankings[HandRankings["RoyalFlush"] = 10] = "RoyalFlush";
})(HandRankings = HandRankings || (HandRankings = {}));
