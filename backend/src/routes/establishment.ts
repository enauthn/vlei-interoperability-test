import { validateStateMachineSession, isCorrectState } from '../utils/sessionUtils';
import { runKliCommand } from '../utils/kliUtils';
import { StateMachine } from "../types/stateMachine";
import { Response } from 'express';
import { Router } from "express";

const router = Router();

// POST: Initialize GEDA and GIDA
router.post('/initialize', (req: any, res: Response) => {
    try {

        const stateMachine = new StateMachine();
        req.session.stateMachine = stateMachine;

        // Validate and rehydrate the state machine session
        validateStateMachineSession(req)

        // Validate the state machine session with the current state
        if (!isCorrectState(req, '1_Establishment', '1_1_InitializeGLEIF', 'START')
        ) {
            res.status(400).send('Invalid state.');
        }

        // Initialize GEDA kli
        // Initialize GIDA kli
        runKliCommand()

        // transition the state machine
        req.session.stateMachine.transition();
        console.log("session_ID:", req.sessionID);

        res.send('GEDA and GIDA initialized.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error initializing GEDA and GIDA.');
    }
});

// POST: initialize QAR's AID
router.post('/initializeQAR', (req: any, res: Response) => {
    try {
        // Validate and rehydrate the state machine session
        validateStateMachineSession(req);

        // Validate the state machine session with the current state
        if (!isCorrectState(req, '1_Establishment', '1_2_InitializeQARs', 'START')
        ) {
            res.status(400).send('Invalid state.');
        }

        // transition the state machine
        req.session.stateMachine.transition();
        console.log("session_ID:", req.sessionID);

        res.send('QAR\'s initialized.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error initializing QAR\'s.');
    }
});

// GET: Resolve GLEIF's OOBIs
router.get('/resolveGLEIF', (req: any, res: Response) => {
    try {
        // Validate and rehydrate the state machine session
        validateStateMachineSession(req);

        if (!isCorrectState(req, '1_Establishment', '1_3_ResolveGLEIF', 'START')) {
            res.status(400).send('Invalid state.');
        }

        // Generate GAR 1's OOBIs
        // Generate GAR 2's OOBIs
        // Generate GEDA's OOBIs

        // Generate GAR 1's OOBIs
        // Generate GAR 2's OOBIs
        // Generate GIDA's OOBIs


        // transition the state machine
        req.session.stateMachine.transition();

        res.send('GLEIF\'s OOBIs resolved.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error resolving GLEIF\'s OOBIs.');
    }
});


// POST: Resolve QAR's OOBIs
router.post('/resolveQAR', (req: any, res: Response) => {
    try {
        const { oobi_qar1, oobi_qar2, oobi_qar3 } = req.body;



        // Validate and rehydrate the state machine session
        validateStateMachineSession(req);

        if (!isCorrectState(req, '1_Establishment', '1_4_ResolveQARs', 'START')) {
            res.status(400).send('Invalid state.');
        }

        // Generate QAR 1's OOBIs
        // Generate QAR 2's OOBIs
        // Generate QAR 3's OOBIs

        // transition the state machine
        req.session.stateMachine.transition();

        res.send('QAR\'s OOBIs resolved.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error resolving QAR\'s OOBIs.');
    }
});



// machine state api

// // POST: Create a new state machine and store it in the session
// router.post('/stateMachine', (req: any, res: Response) => {
//     try {
//         const stateMachine = new StateMachine();
//         req.session.stateMachine = stateMachine;
//         res.send('State machine created.');
//     } catch (error) {
//         res.status(500).send('Error creating state machine.');
//     }
// });

// // POST: Transition state in the current state machine
// router.post('/transition', (req: any, res: any) => {
//     try {
//         if (!req.session.stateMachine) {
//             return res.status(400).json({ message: 'State machine not initialized.' });
//         }

//         // Rehydrate stateMachine if necessary
//         if (!(req.session.stateMachine instanceof StateMachine)) {
//             req.session.stateMachine = Object.assign(new StateMachine(), req.session.stateMachine);
//         }

//         req.session.stateMachine.transition();
//         res.send('State transitioned successfully.');
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error transitioning state.');
//     }
// });

// // GET: Retrieve the current state of the state machine
router.get('/state', (req: any, res: any) => {
    try {
        if (!req.session.stateMachine) {
            return res.status(400).send('State machine not initialized.');
        }
        // Rehydrate stateMachine if necessary
        if (!(req.session.stateMachine instanceof StateMachine)) {
            req.session.stateMachine = Object.assign(new StateMachine(), req.session.stateMachine);
        }
        // get the current state
        const currentState = req.session.stateMachine.getCurrentState();
        res.send(currentState);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving state.');
    }
});


export default router;


// TODO:
// *** change all methods to the real establishment methods

// 1. fix Request and Response types
// 2. add error handling
// 3. add logging(passcode?)