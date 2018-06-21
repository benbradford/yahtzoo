import * as React from 'react';
import './App.css';
import InGameView from './view/InGameView';

class App extends React.Component {

  public render() {
    
    return (
      <div className="App">
        
            <InGameView />
            
      </div>
    );
  }



}

export default App;
