import * as React from 'react';
import Die from './Die'

const images = [
    require('./img/die1.png'), 
    require('./img/die2.png'), 
    require('./img/die3.png'), 
    require('./img/die4.png'), 
    require('./img/die5.png'), 
    require('./img/die6.png')
];

class DieView extends React.Component<any, any>{

     private die : Die;
     private readonly num : number;

    constructor(props : any) {
        super(props);

        this.num = this.props.num;
        this.die = this.props.die;
    }
  
   
    public render() {         
        return (
            <p><code>{this.num} </code>
                <button onClick={this.buttonClick}> 
                    <img src={this.image()} className="Dice-Img" /> 
                </button>     
            </p>
        );
    }

    private image() : any {
        const dieImage = images[this.die.value() - 1];
        return dieImage;
    }

    private buttonClick = () => {
        if (this.die.is_held()) {
            this.die.reset_hold();
        } else {
            this.die.hold();
        }
    }

}

export default DieView;
