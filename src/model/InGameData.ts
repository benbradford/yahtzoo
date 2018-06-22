export enum InGameStateType {
    awaiting_roll,
    rolling,
    awaiting_selection,
    selection_pending,
    game_complete
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

export function total_committed_dice_value(data : number | undefined []) : number {
    let total : number = 0;
    for (let i = 0; i < 6; ++i) {
        const v = data[i];
        if (v !== undefined) {
            total += v;
        }
    }
    return total;
}

export function total_score(data : number | undefined []) : number {
    let total : number = 0;
    for (let i = 0; i < IScoreCategory.max; ++i) {
        const t = data[i];
        if (t !== undefined) {
            total += t;
        }
    }
    if (total_committed_dice_value(data) >= 62) {
        total += 35;
    }
    return total;
}