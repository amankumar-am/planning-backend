import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../modules/auth/user.repository';

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            res.status(401).json({ error: 'Access token required' });
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            res.status(500).json({ error: 'JWT secret not configured' });
            return;
        }

        // Verify JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        // Optional: Verify user still exists in database
        const userRepository = new UserRepository();
        const user = await userRepository.findById(decoded.id);

        if (!user || !user.isActive) {
            res.status(401).json({ error: 'User not found or inactive' });
            return;
        }

        // Set user info in request object
        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: 'Token expired' });
            return;
        }
        res.status(500).json({ error: 'Authentication error' });
    }
};

// Optional middleware that doesn't require authentication but sets user if token is valid
export const optionalAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token && process.env.JWT_SECRET) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
            req.user = {
                id: decoded.id,
                email: decoded.email
            };
        }

        next();
    } catch (error) {
        // Continue without user if token is invalid in optional mode
        next();
    }
}; 