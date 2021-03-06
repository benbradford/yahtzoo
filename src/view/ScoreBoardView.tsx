import * as React from 'react';
import {IScoreCategory, total_score, total_committed_dice_value} from '../model/InGameData'
import ScoreCategoryView from './ScoreCategoryView'
import BonusCellView from './BonusCellView'
import ScoreCalculator from '../model/ScoreCalculator'

class ScoreBoardView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {    
        const calc : ScoreCalculator = new ScoreCalculator(this.props.dice);
        return (
            <p>          
                <table className="ScoreBoard"> <tr>
                    <tr> {this.add_view(calc, IScoreCategory.ones, "ones    ")}  {this.add_view(calc, IScoreCategory.trips, "trips   ")}  </tr>
                    <tr> {this.add_view(calc, IScoreCategory.twos, "twos    ")}  {this.add_view(calc, IScoreCategory.quads, "quads   ")}  </tr>
                    <tr> {this.add_view(calc, IScoreCategory.threes, "threes ")}  {this.add_view(calc, IScoreCategory.full, "full    ")}  </tr>
                    <tr> {this.add_view(calc, IScoreCategory.fours, "fours  ")} {this.add_view(calc, IScoreCategory.small, "small   ")}  </tr>
                    <tr> {this.add_view(calc, IScoreCategory.fives, "fives  ")}  {this.add_view(calc, IScoreCategory.large, "large   ")}  </tr>
                    <tr> {this.add_view(calc, IScoreCategory.sixes, "sixes  ")} {this.add_view(calc, IScoreCategory.yahtzee, "yahtzee ")}  </tr>
                    <tr> <BonusCellView total_value={total_committed_dice_value(this.props.scores)}/>  {this.add_view(calc, IScoreCategory.chance, "chance ")}  </tr>
                </tr></table>  
                
                <p className="Score-Label">Total: {total_score(this.props.scores, this.props.numYahtzee)} </p>    
                          
            </p>
        );
    }
    
    private handleScoreSelection = (category : IScoreCategory, score : number) => {
        this.props.onScoreSelection(category, score);
    }

    private add_view(calc : ScoreCalculator, category : IScoreCategory, name : string) : any {
        return  (<ScoreCategoryView onClick={this.handleScoreSelection} calc={calc} category={category} name={name} scores={this.props.scores} is_selected={this.props.selected === category} state={this.props.state}/> );
    }

}

export default ScoreBoardView;
