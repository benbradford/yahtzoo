import * as React from 'react';

import {InGameState, InGameStateType} from './InGameData'
import DieView from './DieView';
import DiceMutator from './DiceMutator';
import GameStateHistory from './GameStateHistory'
// import ScoreMutator from './ScoreMutator'
// import ScoreCalculator from './ScoreCalculator'
import ScoreBoardView from './ScoreBoardView'

class InGameView extends React.Component<{}, InGameState>{

    private history : GameStateHistory;
    private diceMutator : DiceMutator;
   //  private scoreMutator : ScoreMutator;
    constructor(props: {}) {
        super(props);
        this.history = new GameStateHistory();
        this.diceMutator = new DiceMutator(this.history);
       // this.scoreMutator = new ScoreMutator(this.history);
    }
    
    public render() {         
        return (
            <p>
            <ScoreBoardView dice={this.state.dice} scores={this.state.scores} state={this.state.state} />
             <button className = "Click-Button" onClick={this.handleRoll} disabled={this.state.state !== InGameStateType.awaiting_roll}> ROLL </button>
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

    private handleRoll = () => {
        this.move_to(InGameStateType.rolling);
        setTimeout( () => {
            this.move_to(InGameStateType.awaiting_roll);
            this.setState(this.diceMutator.roll());
        }, Math.floor( (100 * Math.random() * 7)) + 300);
    }

    private handleToggleHold = (index : number) => {
        this.setState(this.diceMutator.toggle_hold(index));
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