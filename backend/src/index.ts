import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

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