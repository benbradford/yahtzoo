import * as React from 'react';
import {IScoreCategory} from './InGameData'
import ScoreCategoryView from './ScoreCategoryView'
import BonusCellView from './BonusCellView'

class ScoreBoardView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {    

        return (
            <p>          
                <table className="ScoreBoard"> <tr>
                    <tr> <td> <ScoreCategoryView category={IScoreCategory.ones} name="ones" scores={this.props.scores} /> </td> <td> <ScoreCategoryView category={IScoreCategory.trips} name="trips" scores={this.props.scores} /> </td> </tr>
                    <tr> <td> <ScoreCategoryView category={IScoreCategory.twos} name="twos" scores={this.props.scores} /> </td> <td> <ScoreCategoryView category={IScoreCategory.quads} name="quads" scores={this.props.scores} /> </td> </tr>
                    <tr> <td> <ScoreCategoryView category={IScoreCategory.threes} name="threes" scores={this.props.scores} /> </td> <td> <ScoreCategoryView category={IScoreCategory.full} name="full" scores={this.props.scores} /> </td> </tr>
                    <tr> <td> <ScoreCategoryView category={IScoreCategory.fours} name="fours" scores={this.props.scores} /> </td> <td> <ScoreCategoryView category={IScoreCategory.small} name="small" scores={this.props.scores} /> </td> </tr>
                    <tr> <td> <ScoreCategoryView category={IScoreCategory.fives} name="fives" scores={this.props.scores} /> </td> <td> <ScoreCategoryView category={IScoreCategory.large} name="large" scores={this.props.scores} /> </td> </tr>
                    <tr> <td> <ScoreCategoryView category={IScoreCategory.sixes} name="sixes" scores={this.props.scores} /> </td> <td> <ScoreCategoryView category={IScoreCategory.yahtzee} name="yahtzee" scores={this.props.scores} /> </td> </tr>
                    <tr> <td> <BonusCellView /> </td> <td> <ScoreCategoryView category={IScoreCategory.chance} name="chance"scores={this.props.scores}  /> </td> </tr>
                </tr></table>                   
            </p>
        );
    }


}

export default ScoreBoardView;
