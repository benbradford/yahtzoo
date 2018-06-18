import Die from './Die';

class Dice {

    private dice : Die[];
    // private totals : Array<Number>[5];
  
    constructor() {
        this.dice = new Array(5);
        for (let i = 0; i < 5; ++i) {
            this.dice[i] = new Die();
        }
    }

    public value_of(index : number) : number {
        return this.dice[index].value();
    }

    public roll() {
       this.dice.forEach((die : Die) => { die.roll(); });
    }

    public die(index : number) : Die {
        return this.dice[index];
    }

    public getAll() : Die[] {
        return this.dice;
    }
  
  }

  export default Dice;