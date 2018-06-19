import * as React from 'react';
import './App.css';
import Dice from './Dice'
import Die from './Die'
import DieView from './DieView';

class App extends React.Component {

  private dice : Dice = new Dice;
  
  constructor(props : any) {
    super(props);
    this.dice.roll();
  }
  
  public render() {
    
    return (
      <div className="App">
        <div style={{textAlign:"left"}}>
        <button onClick={this.handleRoll}
            title="Roll"
            color="#841584"> Roll </button>
          <table>          
            {this.dice.getAll().map(this.renderOneDie)}
          </table>
        </div>      
      </div>
    );
  }

  private renderOneDie( die: Die, index: number) {
    return (
      <td> <DieView key={index} die={die} /> </td>
    );
  }

  private handleRoll = () => {
    this.dice.roll();
    this.forceUpdate();
  }

}

export default App;
