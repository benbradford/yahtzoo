import {InGameState} from './InGameData'

export default class GameStateHistory {

    private history : InGameState[] = [];
    private undone : InGameState[] = [];

    constructor() {      
        const state : InGameState = {
            dice : [
                { value: 1, held: false },
                { value: 1, held: false },
                { value: 1, held: false },
                { value: 1, held: false },
                { value: 1, held: false }
            ]       
        };
        this.push_state(state);
    }

    public current() : InGameState {
        return this.history[this.history.length-1];
    }

    public can_undo() : boolean {
        return this.history.length > 0;
    }

    public can_redo() : boolean {
        return this.undone.length > 0;
    }

    public undo() : InGameState {
        const latest = this.history.pop();
        if (latest !== undefined) {
            this.undone.push(latest);
        }
        return this.current();
    }

    public redo() : InGameState {
        const latest = this.undone.pop();
        if (latest !== undefined) {
            this.history.push(latest);
        }
        return this.current();
    }

    public push_state(newState : InGameState) : InGameState {
        this.undone = [];
        this.history.push(newState);
        return this.current();
    }
}