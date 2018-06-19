import * as React from 'react';

import Dice from './Dice';
import DieView from './DieView';

interface InGameState {
    dice : Dice;
}

class InGameView extends React.Component<{}, InGameState>{

    constructor(props: {}) {
        super(props);
        
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
        const dice = new Dice();
        dice.set_default();
        this.setState({dice});
    }

    private renderOneDie( index: number) {
     return (
        <td> <DieView num={index} dice={this.state.dice} onClick={this.handleToggleHold} /> </td>
        );
    }

    private handleRoll = () => {
        const dice = Dice.roll(this.state.dice);
        this.setState({dice});     
    }

    private handleToggleHold = (index : number) => {
        const dice = Dice.toggle_hold(index, this.state.dice);
        this.setState({dice});
    }

}

export default InGameView;