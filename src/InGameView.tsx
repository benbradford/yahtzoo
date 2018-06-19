import * as React from 'react';

import {InGameState} from './InGameData'
import DieView from './DieView';
import DiceMutator from './DiceMutator';
import GameStateHistory from './GameStateHistory'

class InGameView extends React.Component<{}, InGameState>{

    private history : GameStateHistory;
    private diceMutator : DiceMutator;

    constructor(props: {}) {
        super(props);
        this.history = new GameStateHistory();
        this.diceMutator = new DiceMutator(this.history);
    }
    
    public render() {         
        return (
            <p>
             <button onClick={this.handleRoll}> ROLL </button>
             <table>          
               {this.renderOneDie(0)}
               {this.renderOneDie(1)}
               {this.renderOneDie(2)}
               {this.renderOneDie(3)}
               {this.renderOneDie(4)}
             </table>
            </p>
        );
    }

    public componentWillMount() {
        this.setState(this.history.current());
    }

    private renderOneDie( index: number) {
        return (
            <td> 
                <DieView num={index} dice={this.state.dice} onClick={this.handleToggleHold} /> 
            </td>
        );
    }

    private handleRoll = () => {
        this.setState(this.diceMutator.roll());
    }

    private handleToggleHold = (index : number) => {
        this.setState(this.diceMutator.toggle_hold(index));
    }
}

export default InGameView;