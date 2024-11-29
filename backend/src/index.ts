import express from 'express';
import establishRouter from './routes/establishment';
const app = express();

app.use(express.json());

const port = 3000;

app.use("/establishment", establishRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// TODO
// - call runKliInitialized when the server starts