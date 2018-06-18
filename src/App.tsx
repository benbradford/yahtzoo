import * as React from 'react';
import './App.css';
import Dice from './Dice'
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
            <tr> <td> <DieView num={1} die={this.dice.die(0)} /> </td> </tr>
            <tr> <td> <DieView num={2} die={this.dice.die(1)} /> </td> </tr>
            <tr> <td> <DieView num={3} die={this.dice.die(2)} /> </td> </tr>
            <tr> <td> <DieView num={4} die={this.dice.die(3)} /> </td> </tr>
            <tr> <td> <DieView num={5} die={this.dice.die(4)} /> </td> </tr>
          </table>
        </p>
            
      </div>
    );
  }
}

export default App;
