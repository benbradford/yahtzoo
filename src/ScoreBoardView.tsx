import * as React from 'react';
import {IScoreCategory} from './InGameData'
import ScoreCategoryView from './ScoreCategoryView'
import BonusCellView from './BonusCellView'
import ScoreCalculator from './ScoreCalculator'

class ScoreBoardView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {    
        const calc : ScoreCalculator = new ScoreCalculator(this.props.dice);
        return (
            <p>          
                <table className="ScoreBoard"> <tr>
                    <tr> <ScoreCategoryView calc={calc} category={IScoreCategory.ones}   name="ones    " scores={this.props.scores} />  <ScoreCategoryView calc={calc} category={IScoreCategory.trips} name="trips   " scores={this.props.scores} />  </tr>
                    <tr> <ScoreCategoryView calc={calc} category={IScoreCategory.twos}   name="twos    " scores={this.props.scores} />  <ScoreCategoryView calc={calc} category={IScoreCategory.quads} name="quads   " scores={this.props.scores} />  </tr>
                    <tr> <ScoreCategoryView calc={calc} category={IScoreCategory.threes} name="threes " scores={this.props.scores} />  <ScoreCategoryView calc={calc} category={IScoreCategory.full}   name="full    " scores={this.props.scores} />  </tr>
                    <tr> <ScoreCategoryView calc={calc} category={IScoreCategory.fours}  name="fours  " scores={this.props.scores} /> <ScoreCategoryView calc={calc} category={IScoreCategory.small}   name="small   " scores={this.props.scores} />  </tr>
                    <tr> <ScoreCategoryView calc={calc} category={IScoreCategory.fives}  name="fives  " scores={this.props.scores} />  <ScoreCategoryView calc={calc} category={IScoreCategory.large}  name="large   " scores={this.props.scores} />  </tr>
                    <tr> <ScoreCategoryView calc={calc} category={IScoreCategory.sixes}  name="sixes  " scores={this.props.scores} /> <ScoreCategoryView calc={calc} category={IScoreCategory.yahtzee} name="yahtzee " scores={this.props.scores} />  </tr>
                    <tr> <BonusCellView />  <ScoreCategoryView calc={calc} category={IScoreCategory.chance} name="chance "scores={this.props.scores}  />  </tr>
                </tr></table>                   
            </p>
        );
    }


}

export default ScoreBoardView;
