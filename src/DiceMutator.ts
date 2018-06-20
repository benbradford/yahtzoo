import {InGameState} from './InGameData'

export default class DiceMutator {

    public roll(old : InGameState) : InGameState {    
        
        const newState : InGameState=  {
            dice : [
                { value: this.new_value_or_held(old, 0), held: old.dice[0].held },
                { value: this.new_value_or_held(old, 1), held: old.dice[1].held  },
                { value: this.new_value_or_held(old, 2), held: old.dice[2].held },
                { value: this.new_value_or_held(old, 3), held: old.dice[3].held  },
                { value: this.new_value_or_held(old, 4), held: old.dice[4].held  }
            ],
            state : old.state,
            rollNumber : old.rollNumber + 1,
            scores : old.scores  
        };
        return newState;
    }

    public toggle_hold(old : InGameState, index : number) : InGameState {
        
        const newState : InGameState =  {
            dice : [
                    { value: old.dice[0].value, held: this.old_value_or_toggle(old, 0, index)},
                    { value: old.dice[1].value, held: this.old_value_or_toggle(old, 1, index)},
                    { value: old.dice[2].value, held: this.old_value_or_toggle(old, 2, index)},
                    { value: old.dice[3].value, held: this.old_value_or_toggle(old, 3, index)},
                    { value: old.dice[4].value, held: this.old_value_or_toggle(old, 4, index)}
                ]   ,
            state : old.state,
            rollNumber : old.rollNumber,
            scores : old.scores  
          };
       return newState;
    }

    public reset_all_holds(old :InGameState) {
        for (let i = 0; i < 5; ++i) {
            old.dice[i].held = false;
        }
        return old;
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