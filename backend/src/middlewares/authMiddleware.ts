import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

/**
 * Middleware to verify JWT in the Authorization header.
 */
// export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
export const authMiddleware = (req: Request, res: any, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Authorization token is missing.');
    }

    const token = authHeader.split(' ')[1]; // Extract the token (e.g., "Bearer <token>")
    try {
        const decoded = verifyToken(token); // Verify the token
        (req as any).user = decoded; // Attach the decoded payload to the request (type-casted for simplicity)
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).send('Invalid or expired token.');
    }
};
