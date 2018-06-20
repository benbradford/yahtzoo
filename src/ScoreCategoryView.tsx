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
                <code> {this.props.name} {this.score()} </code>              
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

}

export default ScoreCategoryView;
