import session from 'express-session';
import { RequestHandler } from 'express';

export const sessionMiddleware: RequestHandler = session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
});