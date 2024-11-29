import { Router } from "express";
import { isCorrectState } from '../utils/validateUtils';
import { runKliCommand } from '../utils/kliUtils';
import { useStateMachine, resetStateMachine } from '../store/useStateMachine';

const router = Router();

// POST: Initialize GEDA and GIDA
router.post('/initialize', (req: any, res: any) => {
    try {
        resetStateMachine()

        if (!isCorrectState('1_Establishment', '1_1_InitializeGLEIF', 'START')
        ) {
            return res.status(400).send('Invalid state.');
        }

        // Initialize GEDA kli
        // Initialize GIDA kli
        // runKliCommand()

        // transition the state machine
        useStateMachine.transition();

        res.send('GEDA and GIDA initialized.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error initializing GEDA and GIDA.');
    }
});

// POST: initialize QAR's AID
router.post('/initializeQAR', (req: any, res: any) => {
    try {
        if (!isCorrectState('1_Establishment', '1_2_InitializeQARs', 'START')) {
            return res.status(400).send('Invalid state.'); // Add 'return' to stop execution
        }

        // Transition the state machine
        useStateMachine.transition();

        res.send('QAR\'s initialized.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error initializing QAR\'s.');
    }
});


// GET: Resolve GLEIF's OOBIs
router.get('/resolveGLEIF', (req: any, res: any) => {
    try {

        if (!isCorrectState('1_Establishment', '1_3_ResolveGLEIF', 'START')) {
            return res.status(400).send('Invalid state.');
        }

        // // Generate GAR 1's OOBIs
        // // Generate GAR 2's OOBIs
        // // Generate GEDA's OOBIs

        // // Generate GAR 1's OOBIs
        // // Generate GAR 2's OOBIs
        // // Generate GIDA's OOBIs


        // // transition the state machine
        useStateMachine.transition();

        res.send('GLEIF\'s OOBIs resolved.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error resolving GLEIF\'s OOBIs.');
    }
});


// POST: Resolve QAR's OOBIs
router.post('/resolveQAR', (req: any, res: any) => {
    try {
        // const { oobi_qar1, oobi_qar2, oobi_qar3 } = req.body;

        if (!isCorrectState('1_Establishment', '1_4_ResolveQARs', 'START')) {
            return res.status(400).send('Invalid state.');
        }

        // // Generate QAR 1's OOBIs
        // // Generate QAR 2's OOBIs
        // // Generate QAR 3's OOBIs

        // // transition the state machine
        useStateMachine.transition();

        res.send('QAR\'s OOBIs resolved.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error resolving QAR\'s OOBIs.');
    }
});

// // GET: Retrieve the current state of the state machine
router.get('/state', (req: any, res: any) => {
    try {
        const currentState = useStateMachine.getCurrentState();
        res.send(currentState);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving state.');
    }
});


export default router;


// TODO:
// *** change all methods to the real establishment methods
// - kli command init, incept, getoobi, resolveoobi
// - add error handling
// - add logging(passcode?)