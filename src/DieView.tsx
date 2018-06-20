import * as React from 'react';
import {InGameStateType} from './InGameData'

const images = [
    require('./img/roll.gif'),
    require('./img/die1.png'), 
    require('./img/die2.png'), 
    require('./img/die3.png'), 
    require('./img/die4.png'), 
    require('./img/die5.png'), 
    require('./img/die6.png')
];

class DieView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
                     
                <button onClick={this.onClick} className={this.border_style()}> 
                    <img src={this.image()} className={this.dice_style()} /> 
                </button>                 
            
        );
    }

    private is_held() : boolean {
        return this.props.dice[this.props.num].held;
    }

    private image() : any {
        if (this.is_spinning()) {
            return images[0];
        }
        const index = this.props.num;
        const dice = this.props.dice;
        const value = dice[index].value;
        const dieImage = images[value];
        return dieImage;
    }

    private border_style() : string {
        if (this.is_held()) {
            return "Dice-Border-Held";
        }
        
        return "Dice-Border-None";
    }

    private is_spinning() : boolean {
        return this.is_held() === false && this.props.currentState === InGameStateType.rolling;
    }

    private dice_style() : string {
        if (this.is_spinning()) {
            return "Dice-Spin";
        }
        return "Dice-Img";
    }

    private onClick = () => {
        this.props.onClick(this.props.num);
    }
}

export default DieView;
