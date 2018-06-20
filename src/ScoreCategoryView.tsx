import * as React from 'react';
// import {InGameStateType, IScoreCategory} from './InGameData'
import ScoreCalculator from './ScoreCalculator'

class ScoreCategoryView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
            <td className="ScoreBoard-Cell">          
                <button onClick={this.clicked}> <code> {this.props.name} {this.score()} </code>  </button>            
            </td>
       
        );
    }

    private score() : string {    
        const s = this.props.scores[this.props.category];
        if (s === undefined) {
            const calc : ScoreCalculator = this.props.calc;
            return "" + calc.score(this.props.category);
        }
        return "" + s;
    }

    private clicked = () => {
        const s = this.props.scores[this.props.category];
        if (s === undefined) {
            this.props.onClick(this.props.category, this.props.calc.score(this.props.category));
        }
    }
}

export default ScoreCategoryView;
