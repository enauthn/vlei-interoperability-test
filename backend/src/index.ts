import dotenv from 'dotenv';
import express from 'express';
import { generateToken } from './utils/jwtUtils';
import establishRouter from './routes/establishment';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
app.use(express.json());

const port = 3000;

// Create a JWT when the server starts
let serverToken: string;

app.listen(port, () => {
    // Generate the server JWT
    const payload = { role: 'server', issuedAt: new Date().toISOString() }; // Custom payload
    serverToken = generateToken(payload);

    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Generated JWT: ${serverToken}`);
});

// Routes that require authentication
app.use('/establishment', authMiddleware, establishRouter);


// TODO
// - call runKliInitialized when the server starts