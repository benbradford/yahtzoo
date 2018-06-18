import * as React from 'react';
import './App.css';
import Dice from './Dice'
import Die from './Die'
import DieView from './DieView';

class App extends React.Component {

  private dice : Dice = new Dice;

  public render() {
    this.dice.roll();
    return (
      <div className="App">
        <header className="App-header" />

        <p className="App-intro">
          <table>          
            {this.dice.getAll().map(this.renderOneDie)}
          </table>
        </p>
            
      </div>
    );
  }

  private renderOneDie( die: Die, index: number) {
    return (
      <tr> <DieView key={index} die={die} /> </tr>
    );
  }
}

export default App;
