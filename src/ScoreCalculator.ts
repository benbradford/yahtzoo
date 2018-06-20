import {IDie, IScoreCategory} from './InGameData'

export default class ScoreCalculator {

    private totals : number[] = [0,0,0,0,0,0];
    private totalSum : number  = 0;
    constructor(dice : IDie[]) {
        for (let i = 0; i < 5; ++i){
            ++this.totals[dice[i].value-1];
            this.totalSum += (dice[i].value);
        }
    }

    public score(category : IScoreCategory) : number{
        switch (category) {
            case IScoreCategory.ones: return this.ones();
            case IScoreCategory.twos: return this.twos();
            case IScoreCategory.threes: return this.threes();
            case IScoreCategory.fours: return this.fours();
            case IScoreCategory.fives: return this.fives();
            case IScoreCategory.sixes: return this.sixes();
            case IScoreCategory.trips: return this.trips();
            case IScoreCategory.quads: return this.quads();
            case IScoreCategory.full: return this.full();
            case IScoreCategory.small: return this.small();
            case IScoreCategory.large: return this.large();
            case IScoreCategory.yahtzee: return this.yahtzee();
            case IScoreCategory.chance: return this.chance();
        }
        return -1;
    }

    public ones() : number {
        return this.totals[0] * 1;
    }

    public twos() : number {
        return this.totals[1] * 2;
    }

    public threes() : number {
        return this.totals[2] * 3;
    }

    public fours() : number {
        return this.totals[3] * 4;
    }

    public fives() : number {
        return this.totals[4] * 5;
    }

    public sixes() : number {
        return this.totals[5] * 6;
    }

    public trips() : number {
        if (this.has_one_total_with_gte(3)) {
            return this.totalSum;
        }
        return 0;
    }

    public quads() : number {
        if (this.has_one_total_with_gte(4)) {
            return this.totalSum;
        }
        return 0;
    }

    public full() : number {

        if (this.has_one_total_with_exactly(2) && this.has_one_total_with_exactly(3)) {
            return 25;
        }
        return 0;
    }

    public small() : number {
        if (this.has_consecutive(0, 4) || this.has_consecutive(1, 4) || this.has_consecutive(2, 4)) {
            return 30;
        }
        return 0;
    }

    public large() : number {
        if (this.has_consecutive(0, 5) || this.has_consecutive(1, 5)) {
            return 30;
        }
        return 0;
    
    }

    public yahtzee() : number {
        if (this.has_one_total_with_exactly(5)) {
            return 50;
        }
        return 0;
    }

    public chance() : number {
        return this.totalSum;
    }

    private has_consecutive(startIndex : number, required : number) : boolean {
        for (let i = startIndex; i < required; ++i) {
            if (this.totals[i] === 0) {
                return false;
            }
        }
        return true;
    }
    
    private has_one_total_with_gte(target : number) : boolean {
        for (let i = 0; i < 6; ++i) {
            if (this.totals[i] >= target) {
                return true;
            }
        }
        return false;
    }

    private has_one_total_with_exactly(target : number) : boolean {
        for (let i = 0; i < 6; ++i) {
            if (this.totals[i] === target) {
                return true;
            }
        }
        return false;
    }
}