export enum InGameStateType {
    awaiting_roll,
    rolling,
}
export enum IScoreCategory {
    ones = 0,
    twos,
    threes,
    fours,
    fives,
    sixes,
    trips,
    quads,
    full,
    small,
    large,
    yahtzee,
    chance,

    max
}
export interface IDie {
    value : number;
    held : boolean;
}

export interface InGameState {
    dice : IDie[];
    state : InGameStateType;
    rollNumber : number;
    scores : number | undefined[];
}
