import * as React from 'react';
import Die from './Die'
import die1 from './die1.png';
import die2 from './die2.png';
import die3 from './die3.png';
import die4 from './die4.png';
import die5 from './die5.png';
import die6 from './die6.png';

class DieView extends React.Component<any, any>{

     private readonly die : Die;
     private readonly num : number;

    constructor(props : any) {
        super(props);

        this.num = this.props.num;
        this.die = this.props.die;
    }
  
    public render() {
        
        return (
            <p><code>Die {this.num} </code>
            <img src={this.image()} className="Dice-Img"/>
            </p>
        );
    }

    private image() : any {
        let dImage : any = die1;
        switch (this.die.value()) {
            case 2: dImage = die2; break;
            case 3: dImage = die3; break;
            case 4: dImage = die4; break;
            case 5: dImage = die5; break;
            case 6: dImage = die6; break;
        }
        return dImage;
    }
}

export default DieView;
