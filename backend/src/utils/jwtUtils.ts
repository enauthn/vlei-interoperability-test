import jwt from 'jsonwebtoken';
import crypto from 'crypto';

let JWT_SECRET = crypto.randomBytes(64).toString('hex');
// const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1w';

/**
 * Generate a JWT token.
 */
export const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET);
};

/**
 * Verify a JWT token.
 */
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token.');
    }
};
