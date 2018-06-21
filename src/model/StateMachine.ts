export interface IStateMachineState {
    name() : string;
}

export class StateMachine {

    private state : IStateMachineState;

    constructor(state : IStateMachineState) {
        this.state = state;
    }

    public move_to(state : IStateMachineState) {
        this.state = state;
    }

    public current_state_name() : string {
        return this.state.name();
    }

}


