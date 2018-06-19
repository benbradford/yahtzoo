import * as React from 'react';

const images = [
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
            <p><code>{this.props.num} </code>            
                <button onClick={this.onClick}> <img src={this.image()} className="Dice-Img" /> </button>                 
            </p>
        );
    }

    private image() : any {
        const index = this.props.num;
        const dice = this.props.dice;
        const value = dice.value_of(index) - 1;
        const dieImage = images[value];
        return dieImage;
    }

    private onClick = () => {
        this.props.onClick(this.props.num);
    }
}

export default DieView;
