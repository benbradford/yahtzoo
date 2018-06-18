import * as React from 'react';
import Die from './Die'

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
            <code>Die {this.num} = {this.die.value()} </code>
        );
    }
}

export default DieView;
