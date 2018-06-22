import * as React from 'react';

import {InGameState, InGameStateType, IScoreCategory} from '../model/InGameData'
import DieView from './DieView';
import DiceMutator from '../model/DiceMutator';
import ScoreMutator from '../model/ScoreMutator'
import ScoreBoardView from './ScoreBoardView'

class InGameView extends React.Component<{}, InGameState>{

    private diceMutator : DiceMutator;
    private scoreMutator : ScoreMutator;

    private selectedCategory : IScoreCategory | undefined = undefined;
    private selectedScore : number = 0;

    constructor(props: {}) {
        super(props);
        this.diceMutator = new DiceMutator();
        this.scoreMutator = new ScoreMutator();
    }
    
    public render() {         
        return (
            <p>
            <ScoreBoardView dice={this.state.dice} scores={this.state.scores} state={this.state.state} onScoreSelection={this.handleScoreSelection} selected={this.selectedCategory}/>
             
             <button className = "Click-Button" onClick={this.handleRoll} disabled={this.is_button_disabled()}> {this.button_text()} </button>
             <div className="Dice-Together"><table> <tr>         
               {this.renderOneDie(0)}
               {this.renderOneDie(1)}
               {this.renderOneDie(2)}
               {this.renderOneDie(3)}
               {this.renderOneDie(4)}
             </tr></table>
             </div>
            </p>
        );
    }

    public componentWillMount() {
       this.init();
    }

    private init () : void {
        const startState : InGameState = {
            dice : [
                { value: 1, held: false },
                { value: 1, held: false },
                { value: 1, held: false },
                { value: 1, held: false },
                { value: 1, held: false }
            ],
            state : InGameStateType.awaiting_roll,
            rollNumber : 0,
            scores : ScoreMutator.make_empty_scores()  
        };
    
    this.setState(startState);
    }

    private renderOneDie( index: number) {
        return (
            <td> 
                <DieView num={index} dice={this.state.dice} onClick={this.handleToggleHold} currentState={this.state.state}/> 
            </td>
        );
    }

    private is_button_disabled() {
        const curr : InGameStateType = this.state.state;
        if (curr === InGameStateType.awaiting_roll) {
            return false;
        }
        if (this.state.state === InGameStateType.awaiting_selection) {
            if (this.state.rollNumber === 3) {
                return true;
            }
            return false;
        }
        if (this.state.state === InGameStateType.selection_pending) {
            return false;
        }
        if (this.state.state === InGameStateType.game_complete) {
            return false;
        }
        return true;
    }

    private button_text() : any {
        if (this.state.state === InGameStateType.game_complete) {
            return "RETRY";
        }
        if (this.state.state === InGameStateType.selection_pending || this.state.rollNumber === 3) {
            return "SELECT";
        }    
        return "ROLL";
    }

    private handleRoll = () => {
        if (this.state.state === InGameStateType.game_complete) {
            this.init();
            return;
        }
        if (this.state.state === InGameStateType.selection_pending && this.selectedCategory !== undefined) {
            let nextState : InGameState = this.scoreMutator.add_score(this.state, this.selectedCategory, this.selectedScore);
            nextState = this.diceMutator.reset_all_holds(nextState);
            this.selectedCategory = undefined;
            if (this.scoreMutator.is_complete()) {
                this.move_to_from_base(InGameStateType.game_complete, nextState); 
                return; 
            } 
            nextState.rollNumber = 0;
            this.move_to_from_base(InGameStateType.rolling, nextState);         
        } else {
            this.move_to(InGameStateType.rolling);
        }
        
        setTimeout( () => {
            const nextState : InGameState = this.diceMutator.roll(this.state);
            this.move_to_from_base(InGameStateType.awaiting_selection, nextState);
        }, Math.floor( (100 * Math.random() * 7)) + 300);
    }

    private handleToggleHold = (index : number) => {
        if (this.state.rollNumber === 0) {
            return;
        }
        if (this.state.rollNumber === 3) {
            return;
        }
        this.setState(this.diceMutator.toggle_hold(this.state, index));
    }

    private handleScoreSelection = (category : IScoreCategory, score : number) => {
        if (this.scoreMutator.has_entry(category)) {
            return;    
        } 

        if (this.selectedCategory === category) {
            this.selectedCategory = undefined;
            this.move_to(InGameStateType.awaiting_selection);
            return;
        }
        
        if (this.state.state === InGameStateType.awaiting_selection || this.state.state === InGameStateType.selection_pending) {
            this.selectedCategory = category;
            this.selectedScore = score;
            this.move_to(InGameStateType.selection_pending);
        } 
    }

    private move_to(newState : InGameStateType) {
        const base : InGameState = this.state;
        base.state = newState;
        this.setState(base);
    }

    private move_to_from_base(newState : InGameStateType, base : InGameState) {
        base.state = newState;
        this.setState(base);
    }

}

export default InGameView;