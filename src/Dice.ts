import Die from './Die';

class Dice {

    public static roll(old : Dice) : Dice {
        const copied : Dice = new Dice();
        for (let i = 0; i < 5; ++i) {
            let nextValue = old.dice[i].value;
            if (old.dice[i].held === false) {
                nextValue = 1 + Math.floor( Math.random() * 6);
            }
            copied.dice[i] = new Die(nextValue, old.dice[i].held);     
        }
        
        return copied;
    }

    public static toggle_hold(index : number, old : Dice) : Dice {
        const copied : Dice = new Dice();
        for (let i = 0; i < 5; ++i) {
            if (index === i) {
                copied.dice[i] = new Die(old.dice[i].value, !old.dice[i].held);
            } else {
                copied.dice[i] = new Die(old.dice[i].value, old.dice[i].held);
            }
        }
        
        return copied;
    }

    private dice : Die[];
   
    constructor() {
        this.dice = new Array(5);
    }

    public set_default() {
        for (let i = 0; i < 5; ++i) {
            this.dice[i] = new Die(1, false);
        }
    }

    public value_of(index : number) : number {
        return this.dice[index].value;
    }

    public die(index : number) : Die {
        return this.dice[index];
    }

    public getAll() : Die[] {
        return this.dice;
    }
 
  }

  export default Dice;