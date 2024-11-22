import express, { Request, Response } from 'express';
import { StateMachine } from '../types/stateMachine';
const app = express();
const port = 3000;
// create a new StateMachine instance
let stateMachine: StateMachine;

app.post('/stateMachine', (req: Request, res: Response) => {
    try {
        stateMachine = new StateMachine();
        res.send('State machine created.');
    } catch (error) {
        res.status(500).send('Error creating state machine.');
    }
});

// transition to the next state
app.get('/transition', (req: Request, res: Response) => {
    try {
        stateMachine.transition();
        res.send('Transition successful.');
    } catch (error) {
        res.status(500).send('Error transitioning to the next state.');
    }
});

// get the isCompleted status
app.get('/isCompleted', (req: Request, res: Response) => {
    const isCompleted = stateMachine.isCompleted();
    res.send(isCompleted);
});

// get the current state
app.get('/state', (req: Request, res: Response) => {
    const currentState = stateMachine.getCurrentState();
    res.send(currentState);
});
app.get('/', async (req: Request, res: Response) => {
    try {
        res.send('Hello, World! Script has completed.');
    } catch (error) {
        res.status(500).send('Error executing the script.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});