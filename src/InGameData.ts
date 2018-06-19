
export interface IDie {
    value : number;
    held : boolean;
}

export interface InGameState {
    dice : IDie[];
    state : string;
    rollNumber : number;
}