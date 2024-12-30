import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware'
import { useStateMachine, resetStateMachine } from '../store/useStateMachine';
import { isCorrectState, validSubsubsectionsParams } from '../utils/validateUtils';
import { initializeAIDs, generateOOBI, resolveQARs, generateWords, verifyWords, respondWords } from '../utils/kliUtils';
const router = Router();

// Protect all routes with the authMiddleware
router.use(authMiddleware);

// 1_1_InitializeGLEIF
// POST: Initialize GEDA and GIDA
router.post('/initialize', async (req: any, res: any) => {
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
router.get('/resolveGLEIF', async (req: any, res: any) => {
    try {

        if (!isCorrectState('1_Establishment', '1_3_ResolveGLEIF', 'START')) {
            return res.status(400).send('Invalid state.');
        }

        const res_oobi = await generateOOBI()

        useStateMachine.transition();

        res.send(res_oobi);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error resolving GLEIF\'s OOBIs.');
    }
});


// 1_4_ResolveQARs
// POST: Resolve QAR's OOBIs
router.post('/resolveQARs', async (req: any, res: any) => {
    try {
        const { oobi_qar1, oobi_qar2, oobi_qar3 } = req.body;

        if (!oobi_qar1 || !oobi_qar2 || !oobi_qar3) {
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
// POST: Generate and Verify Challenge Words
router.post('/challenge/:subsubsection', async (req: any, res: any) => {
    try {
        const { subsubsection } = req.params;

        // Validate if the subsubsection is allowed
        if (!validSubsubsectionsParams.includes(subsubsection)) {
            return res.status(400).send('Invalid subsubsection.');
        }

        // Perform logic based on subsubsection type
        let subsubsection_res: string
        let response: any;
        switch (subsubsection) {
            case "start":
                response = "Challenge path started.";
                break;
            case "xgar1-qar1-generate":
            case "xgar1-qar2-generate":
            case "xgar1-qar3-generate":
            case "xgar2-qar1-generate":
            case "xgar2-qar2-generate":
            case "xgar2-qar3-generate":
            case "igar1-qar1-generate":
            case "igar1-qar2-generate":
            case "igar1-qar3-generate":
            case "igar2-qar1-generate":
            case "igar2-qar2-generate":
            case "igar2-qar3-generate":
                // subsubsection from path : "xgar1-qar1-approve"
                // change to "XGAR1_QAR1_APPROVE"
                subsubsection_res = subsubsection.replace(/-/g, '_').toUpperCase();
                console.log(subsubsection_res)
                // Check if the current state is correct
                if (!isCorrectState('1_Establishment', '1_5_ChallengeResponse', subsubsection_res)) {
                    return res.status(400).send('Invalid state for the challenge path.');
                }
                response = await generateWords(); // Generate challenge words
                break;

            case "xgar1-qar1-approve":
            case "xgar1-qar2-approve":
            case "xgar1-qar3-approve":
            case "xgar2-qar1-approve":
            case "xgar2-qar2-approve":
            case "xgar2-qar3-approve":
            case "igar1-qar1-approve":
            case "igar1-qar2-approve":
            case "igar1-qar3-approve":
            case "igar2-qar1-approve":
            case "igar2-qar2-approve":
            case "igar2-qar3-approve":
                // subsubsection from path : "xgar1-qar1-approve"
                // change to "XGAR1_QAR1_APPROVE"
                subsubsection_res = subsubsection.replace(/-/g, '_').toUpperCase();
                console.log(subsubsection_res)
                // Check if the current state is correct
                if (!isCorrectState('1_Establishment', '1_5_ChallengeResponse', subsubsection_res)) {
                    return res.status(400).send('Invalid state for the challenge path.');
                }
                response = await verifyWords(subsubsection_res); // Verify challenge words
                break;

            // Add other mappings as needed for GENERATE and APPROVE logic
            default:
                return res.status(400).send('Unsupported subsubsection.');
        }

        // Transition the state machine after processing
        useStateMachine.transition();

        res.status(200).send({
            message: `Subsubsection ${subsubsection} processed successfully.`,
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the challenge path.');
    }
});

// // 1_5_ChallengeResponse
// // POST: RESPOND
router.post('/respond/:subsubsection', async (req: any, res: any) => {
    try {
        const { subsubsection } = req.params;
        const { resp_words } = req.body;

        // Validate if the subsubsection is allowed
        if (!validSubsubsectionsParams.includes(subsubsection)) {
            return res.status(400).send('Invalid subsubsection.');
        }

        // Perform logic based on subsubsection type
        let subsubsection_res: string;
        let response: any;
        switch (subsubsection) {
            case "qar1-xgar1-respond":
            case "qar2-xgar1-respond":
            case "qar3-xgar1-respond":
            case "qar1-xgar2-respond":
            case "qar2-xgar2-respond":
            case "qar3-xgar2-respond":
            case "qar1-igar1-respond":
            case "qar2-igar1-respond":
            case "qar3-igar1-respond":
            case "qar1-igar2-respond":
            case "qar2-igar2-respond":
            case "qar3-igar2-respond":
                // subsubsection from path : "qar1-xgar1-respond"
                // change to "QAR1_XGAR1_RESPOND"
                subsubsection_res = subsubsection.replace(/-/g, '_').toUpperCase();
                console.log(subsubsection_res)
                // Check if the current state is correct
                if (!isCorrectState('1_Establishment', '1_5_ChallengeResponse', subsubsection_res)) {
                    return res.status(400).send('Invalid state for the challenge path.');
                }
                response = await respondWords(subsubsection_res, resp_words); // Respond to challenge
                break;

            // Add other mappings as needed for RESPOND logic
            default:
                return res.status(400).send('Unsupported subsubsection.');
        }

        // Transition the state machine after processing
        useStateMachine.transition();

        res.status(200).send({
            message: `Subsubsection ${subsubsection} processed successfully.`,
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the challenge path.');
    }
}
);

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
// - add error handling
// - req and res types
// - add multisig script GEDA, GIDA in 1_1_InitializeGLEIF