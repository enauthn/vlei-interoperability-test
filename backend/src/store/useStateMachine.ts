// src/store/stateMachine.ts
import { StateMachine } from '../types/stateMachine';

// initialized the state machine
let useStateMachine = new StateMachine();
let words = "";
// reset the state machine
export const resetStateMachine = () => {
    useStateMachine = new StateMachine();
    console.log('State machine reset.');
}

export const setWords = (newWords: string) => {
    words = newWords;
}

export { useStateMachine, words };