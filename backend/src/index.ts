import dotenv from 'dotenv';
import express from 'express';
import { generateToken } from './utils/jwtUtils';
import establishRouter from './routes/establishment';
import { authMiddleware } from './middlewares/authMiddleware';
// import { runSetupEnvironment } from './utils/kliUtils';

dotenv.config();

const app = express();
app.use(express.json());

const port = 3000;

// Create a JWT when the server starts
let serverToken: string;

app.listen(port, async() => {

    // Generate the server JWT
    const payload = { role: 'server', issuedAt: new Date().toISOString() }; // Custom payload
    serverToken = generateToken(payload);
    if(!serverToken) {
        console.error('Error generating the server JWT.');
        process.exit(1);
    }

    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Generated JWT: ${serverToken}`);
});

// Routes that require authentication
app.use('/establishment', authMiddleware, establishRouter);
