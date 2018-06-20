import * as React from 'react';

class BonusCellView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
            <td className="ScoreBoard-Cell">          
                Bonus:               
            </td>
        );
    }


}

export default BonusCellView;
