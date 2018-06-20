import * as React from 'react';
import {InGameStateType} from './InGameData'
import ScoreCalculator from './ScoreCalculator'

class ScoreCategoryView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
           <td> <button className="Score-Click" onClick={this.clicked} disabled={this.is_button_disabled()}> 
            <td className={this.td_className()}>          
            <code className={this.font_type()}> {this.props.name} </code> </td> <td className={this.td_className()}> <code className={this.font_type() }>{this.score_as_string()}</code>           
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

    private font_type() : string {
        if (this.props.is_selected) {
            return "ScoreBoard-Cell-Font-Selected";
        } else if (this.props.scores[this.props.category] !== undefined){
            return "ScoreBoard-Cell-Font-Commited";
        } else {
            return "ScoreBoard-Cell-Font";
        }
    }

    private td_className() : string {
        if (this.props.is_selected) {
            return "ScoreBoard-Cell-Selected";
        } else if (this.props.scores[this.props.category] !== undefined){
            return "ScoreBoard-Cell-Commited";
        } else {
            return "ScoreBoard-Cell";
        }
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
