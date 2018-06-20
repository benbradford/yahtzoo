import {InGameState, IScoreCategory} from './InGameData'
import GameStateHistory from './GameStateHistory'

export default class ScoreMutator {

    public static make_empty_scores() : number | undefined[] {
        return [undefined, undefined, undefined, undefined, undefined,
                undefined, undefined, undefined, undefined, undefined,
                undefined, undefined, undefined];
    }

    private history : GameStateHistory;

    constructor(history : GameStateHistory) {
        this.history = history;
    }

    public add_score(category : IScoreCategory, total : number) : InGameState {
        const old : InGameState = this.history.current();
        const newScores = ScoreMutator.make_empty_scores();
        for (let i = 0; i < IScoreCategory.max; ++i) {
            if (i === category) {
                newScores[i] = total;
            } else {
                newScores[i] = old.scores[i];
            }
        }
         const newState : InGameState =  {
            dice : old.dice,
            state : old.state,
            rollNumber : old.rollNumber,
            scores : newScores 
        };
        return this.history.push_state(newState);
    }

    public has_entry(category : IScoreCategory): boolean {
        return this.history.current().scores[category] !== undefined;
    }

}