import * as React from 'react';
import './css/ScoreCategoryView.css';

class BonusCellView extends React.Component<any, any>{
    
    constructor(props : any) {
        super(props);
    }
   
    public render() {         
        return (
            <td> <button className="Score-Button"> 
            <td className="Score-TD">          
                <code className="Score-Name-Font">bonus</code> 
            </td> <td className="Score-Value-TD" > 
                <code className={this.score_value_font()}>{this.remaining_or_bonus()}</code>           
            </td>
            </button>
            </td>
        );
    }

    private score_value_font() : string {
        if (this.has_bonus()) {
            return "Score-Value-Font-Committed";
        }
        return "Score-Value-Font";
    }

    private remaining_or_bonus() : string {      
        if (this.has_bonus()) {
            return "35";
        }
        return "-" + (62 - this.props.total_value);
    }

    private has_bonus() : boolean {
        const remains = 62 - this.props.total_value;
        return remains <= 0;
    }
}

export default BonusCellView;
