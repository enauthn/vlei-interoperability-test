// /store/stateMachine.ts
import { StateMachine } from '../types/stateMachine';

// initialized the state machine
let useStateMachine = new StateMachine();

// reset the state machine
export const resetStateMachine = () => {
    useStateMachine = new StateMachine();
    console.log('State machine reset.');
}

export { useStateMachine }