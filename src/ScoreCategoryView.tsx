import * as React from 'react';
import {InGameStateType} from './InGameData'
import ScoreCalculator from './ScoreCalculator'

class ScoreCategoryView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
            <td className={this.td_className()}>          
                <button className="Score-Click" onClick={this.clicked} disabled={this.is_button_disabled()}> <code> {this.props.name} {this.score()}</code>  </button>            
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

    private td_className() : string {
        if (this.props.is_selected) {
            return "ScoreBoard-Cell-Selected";
        } else {
            return "ScoreBoard-Cell";
        }
    }

    private clicked = () => {
        const s = this.props.scores[this.props.category];
        if (s === undefined) {
            this.props.onClick(this.props.category, this.props.calc.score(this.props.category));
        }
    }

    private is_button_disabled() : boolean {
        if (this.props.scores[this.props.category] === undefined) {
            return false;
        }
        return !(this.props.state === InGameStateType.awaiting_selection || this.props.state === InGameStateType.selection_pending);
    }
}

export default ScoreCategoryView;
