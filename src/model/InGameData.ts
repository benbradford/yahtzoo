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

export class InGameDataMutator {

    private updateGame : (newState : InGameState) => void;
    private getGameState : () => InGameState;

    constructor( updateGameState : (newState : InGameState) => void, getGameState : () => InGameState) {
        this.updateGame = updateGameState;
        this.getGameState = getGameState;
    }

    public set_state(newState : InGameState) : void {
        this.updateGame(newState);
    }

    public get_state() : InGameState {
        return this.getGameState();
    }
}
