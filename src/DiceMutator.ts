import {InGameState} from './InGameData'
import GameStateHistory from './GameStateHistory'

export default class DiceMutator {

    private history : GameStateHistory;

    constructor(history : GameStateHistory) {
        this.history = history;
    }

    public roll() : InGameState {    
        const old : InGameState = this.history.current();
        
        const newState : InGameState=  {
            dice : [
                { value: this.new_value_or_held(old, 0), held: old.dice[0].held },
                { value: this.new_value_or_held(old, 1), held: old.dice[1].held  },
                { value: this.new_value_or_held(old, 2), held: old.dice[2].held },
                { value: this.new_value_or_held(old, 3), held: old.dice[3].held  },
                { value: this.new_value_or_held(old, 4), held: old.dice[4].held  }
            ]    
        };
        return this.history.push_state(newState);
    }

    public toggle_hold(index : number) : InGameState {
        const old : InGameState = this.history.current();

        const newState : InGameState =  {
            dice : 
                 [
                    { value: old.dice[0].value, held: this.old_value_or_toggle(old, 0, index)},
                    { value: old.dice[1].value, held: this.old_value_or_toggle(old, 1, index)},
                    { value: old.dice[2].value, held: this.old_value_or_toggle(old, 2, index)},
                    { value: old.dice[3].value, held: this.old_value_or_toggle(old, 3, index)},
                    { value: old.dice[4].value, held: this.old_value_or_toggle(old, 4, index)}
                ]    
          };
       return this.history.push_state(newState);
    }

    private new_value_or_held(state : InGameState, index : number) : number {
        if (state.dice[index].held) {
            return state.dice[index].value;
        }
        return 1 + Math.floor( Math.random() * 6)
    }

    private old_value_or_toggle(state : InGameState, index : number, toggle : number) : boolean {
        if( toggle === index) {
            return !state.dice[index].held;
        } 
        return state.dice[index].held;
    }
}