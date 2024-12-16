import { Router } from "express";
import { useStateMachine, resetStateMachine } from '../store/useStateMachine';
import { initializeAIDs, generateOOBI, resolveQARs} from '../utils/kliUtils';
import { isCorrectState, validSubsubsections } from '../utils/validateUtils';
import { authMiddleware } from '../middlewares/authMiddleware'
const router = Router();

// Protect all routes with the authMiddleware
router.use(authMiddleware);

// 1_1_InitializeGLEIF
// POST: Initialize GEDA and GIDA
router.post('/initialize', async(req: any, res: any) => {
    try {
        resetStateMachine()

        if (!isCorrectState('1_Establishment', '1_1_InitializeGLEIF', 'START')
        ) {
            return res.status(400).send('Invalid state.');
        }

        const res_aids = await initializeAIDs()

        useStateMachine.transition();

        res.send(res_aids);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error initializing GEDA and GIDA.');
    }
});

// 1_2_InitializeQARs
// POST: initialize QAR's AID
router.post('/initializeQAR', (req: any, res: any) => {
    try {
        if (!isCorrectState('1_Establishment', '1_2_InitializeQARs', 'START')) {
            return res.status(400).send('Invalid state.'); // Add 'return' to stop execution
        }

        // runKliCommand()

        // Transition the state machine
        useStateMachine.transition();

        res.send('QAR\'s initialized.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error initializing QAR\'s.');
    }
});

// 1_3_ResolveGLEIF
// GET: Resolve GLEIF's OOBIs
router.get('/resolveGLEIF', async(req: any, res: any) => {
    try {

        if (!isCorrectState('1_Establishment', '1_3_ResolveGLEIF', 'START')) {
            return res.status(400).send('Invalid state.');
        }

        const res_oobi = await generateOOBI()

        useStateMachine.transition();

        // res.send('GLEIF\'s OOBIs resolved.');
        res.send(res_oobi);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error resolving GLEIF\'s OOBIs.');
    }
});


// 1_4_ResolveQARs
// POST: Resolve QAR's OOBIs
router.post('/resolveQARs', async(req: any, res: any) => {
    try {
        const { oobi_qar1, oobi_qar2, oobi_qar3 } = req.body;

        if( !oobi_qar1 || !oobi_qar2 || !oobi_qar3 ) {
            return res.status(400).send('OOBIs are required.');
        }

        if (!isCorrectState('1_Establishment', '1_4_ResolveQARs', 'START')) {
            return res.status(400).send('Invalid state.');
        }
        
        await resolveQARs(oobi_qar1, oobi_qar2, oobi_qar3)

        useStateMachine.transition();

        res.send('QAR\'s OOBIs resolved.');
        // res.send(res_resovle)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error resolving QAR\'s OOBIs.');
    }
});

// 1_5_ChallengeResponse
// POST: Generate and approve OOBIs
router.get('/generateChallenge:subsub', (req: any, res: any) => {
    try {
        const { subsubsection } = req.params;

        if ( !validSubsubsections.includes(subsubsection) ) {
            return res.status(400).send('Invalid subsubsection.');
        }

        if (!isCorrectState('1_Establishment', '1_5_ChallengeResponse', subsubsection)) {
            return res.status(400).send('Invalid state.');
        }

        // should take some mapping for the subsubsection to the correct kli command

        // // KLI Generate GAR1's Challenge word

        // // transition the state machine
        useStateMachine.transition();

        // res.send('OOBIs generated and approved.');  
        const result = {
            ex_gar1: ""
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Error generating and approving OOBIs.');
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
// - kli command challenge response
// - add error handling
// - req and res types