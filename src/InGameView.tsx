import * as React from 'react';

import {InGameState, InGameStateType, IScoreCategory} from './InGameData'
import DieView from './DieView';
import DiceMutator from './DiceMutator';
import GameStateHistory from './GameStateHistory'
import ScoreMutator from './ScoreMutator'

import ScoreBoardView from './ScoreBoardView'

class InGameView extends React.Component<{}, InGameState>{

    private history : GameStateHistory;
    private diceMutator : DiceMutator;
     private scoreMutator : ScoreMutator;

     private selectedCategory : IScoreCategory | undefined = undefined;
    constructor(props: {}) {
        super(props);
        this.history = new GameStateHistory();
        this.diceMutator = new DiceMutator(this.history);
        this.scoreMutator = new ScoreMutator(this.history);
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
        this.setState(this.history.current());
    }

    private renderOneDie( index: number) {
        return (
            <td> 
                <DieView num={index} dice={this.state.dice} onClick={this.handleToggleHold} currentState={this.state.state}/> 
            </td>
        );
    }

    private is_button_disabled() {
        return this.state.state !== InGameStateType.awaiting_roll &&
            this.state.state !== InGameStateType.selection_pending;
    }

    private button_text() : any{
        if (this.state.state === InGameStateType.selection_pending) {
            return "OK";
        }
        return "ROLL";
    }

    private handleRoll = () => {
        if (this.state.state === InGameStateType.selection_pending) {
            this.selectedCategory = undefined;
            if (this.scoreMutator.is_complete()) {
                this.move_to(InGameStateType.game_complete) 
                return; 
            }          
        }
        this.move_to(InGameStateType.rolling);
        setTimeout( () => {
            this.setState(this.diceMutator.roll());
            this.move_to(InGameStateType.awaiting_selection);
        }, Math.floor( (100 * Math.random() * 7)) + 300);
    }

    private handleToggleHold = (index : number) => {
        this.setState(this.diceMutator.toggle_hold(index));
    }

    private handleScoreSelection = (category : IScoreCategory, score : number) => {
        if (this.scoreMutator.has_entry(category)) {
            return;
        
        } else if (this.state.state === InGameStateType.awaiting_selection) {
            this.selectedCategory = category;
            this.move_to(InGameStateType.selection_pending);
            this.setState(this.scoreMutator.add_score(category, score));

        } else if (this.state.state === InGameStateType.selection_pending) {
            this.selectedCategory = category;
            this.setState(this.scoreMutator.change_score(category, score));
        }
    }

    private move_to(newState : InGameStateType) {
        const newData : InGameState=  {
            dice : this.state.dice,
            state : newState,
            rollNumber : this.state.rollNumber,
            scores : this.state.scores  
        };
        this.setState(newData);
    }

}

export default InGameView;