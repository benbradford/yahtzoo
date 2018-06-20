import {InGameState, IScoreCategory} from './InGameData'

export default class ScoreMutator {

     public static make_empty_scores() : number | undefined[] {
        return [undefined, undefined, undefined, undefined, undefined,
                undefined, undefined, undefined, undefined, undefined,
                undefined, undefined, undefined];
    }

    private current : InGameState;
   
    public add_score(old : InGameState, category : IScoreCategory, total : number) : InGameState {
        this.current= old;
        this.current.scores[category] = total;
        return this.current;
    }

    public has_entry(category : IScoreCategory): boolean {
        if (this.current == null) {
            return false;
        }
        return this.current.scores[category] !== undefined;
    }

    public is_complete() : boolean {
        for (let i = 0; i < IScoreCategory.max; ++i) {
            if (this.current.scores[i] === undefined) {
                return false;
            }
        }
        return true;
    }
}