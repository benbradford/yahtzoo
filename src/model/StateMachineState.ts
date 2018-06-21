import {IStateMachineState} from './StateMachine'

export default class StateMachineState implements IStateMachineState {

    private stateName : string;

    constructor(name : string ) {
        this.stateName = name;
    }

    public name() : string {
        return this.stateName;
    }

}