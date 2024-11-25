// src/utils/sessionUtils.ts

import { StateMachine } from '../types/stateMachine';
import { Request } from 'express';
import { Session } from 'express-session';

// Define a custom type for requests that include the session state machine
interface SessionRequest extends Request {
    session: Session & {
        stateMachine?: StateMachine;
    };
}

// Function to validate and rehydrate the state machine session if needed
export const validateStateMachineSession = (req: SessionRequest) => {
    if (!req.session.stateMachine) {
        throw new Error('State machine not initialized.');
    }

    // Rehydrate state machine if it's not a proper instance of StateMachine
    if (!(req.session.stateMachine instanceof StateMachine)) {
        req.session.stateMachine = Object.assign(new StateMachine(), req.session.stateMachine);
    }
};

// check state isCorrectState
export const isCorrectState = (req: SessionRequest, section: string, subsection: string, subsubsection: string) => {
    validateStateMachineSession(req);
    console.log(section, subsection, subsubsection);
    req.session.stateMachine = Object.assign(new StateMachine(), req.session.stateMachine);
    const { section: currentSection, subsection: currentSubsection, subsubsection: currentSubsubsection } = req.session.stateMachine.getCurrentState();

    console.log(currentSection, currentSubsection, currentSubsubsection);
    console.log(section, subsection, subsubsection);
    return currentSection === section && currentSubsection === subsection && currentSubsubsection === subsubsection;
}
