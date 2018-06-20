import * as React from 'react';
// import {InGameStateType, IScoreCategory} from './InGameData'

class ScoreCategoryView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
            <p className="ScoreBoard-Cell">          
                {this.props.name} {this.score()}               
            </p>
        );
    }

    private score() : string {
       
        if (this.props.scores === undefined) {
            return "";
        }
        const s = this.props.scores[this.props.category];
        if (s === undefined) {
            return "";
        }
        return "" + s;
    }

}

export default ScoreCategoryView;
