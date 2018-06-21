import * as React from 'react';
import './ScoreCategoryView.css';
import {InGameStateType} from './InGameData'
import ScoreCalculator from './ScoreCalculator'

class ScoreCategoryView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
           <td> <button className="Score-Button" onClick={this.clicked} disabled={this.is_button_disabled()}> 
            <td className={this.score_td()}>          
                <code className="Score-Name-Font"> {this.props.name} </code> 
            </td> <td className={this.score_value_td()}> 
                <code className={this.score_value_font()}>{this.score_as_string()}</code>           
            </td>
            </button>
            </td>
        );
    }

    private score_as_string() : string {    
        const s = this.score();
        if (s === undefined) {
            const calc : ScoreCalculator = this.props.calc;
            return "" + calc.score(this.props.category);
        }
        return "" + s;
    }

    private score_value_font() : string {
        if (this.score() !== undefined && this.props.state !== InGameStateType.awaiting_roll) {
            return "Score-Value-Font-Committed";
        }
        return "Score-Value-Font";
    }

    private score_value_td() : string {
        if (this.props.is_selected) {
            return "Score-Value-TD-Selected";
        } 
        return "Score-Value-TD";
        
    }

    private score_td() : string {
        if (this.props.is_selected) {
            return "Score-TD-Selected";
        } 
        return "Score-TD";
        
    }
    private clicked = () => {
        const score = this.score();
        if (score === undefined) {
            this.props.onClick(this.props.category, this.props.calc.score(this.props.category));
        }
    }

    private is_button_disabled() : boolean {
        const score = this.score();
        if (score=== undefined) {
            return false;
        }
        return !(this.props.state === InGameStateType.awaiting_selection || this.props.state === InGameStateType.selection_pending);
    }

    private score() : number | undefined {
        if (this.props.state === InGameStateType.awaiting_roll) {
            return 0;
        }
        return this.props.scores[this.props.category];
    }
}

export default ScoreCategoryView;
