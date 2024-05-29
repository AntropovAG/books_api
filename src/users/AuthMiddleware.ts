import { verify, JwtPayload } from 'jsonwebtoken';
import { Middleware } from '../Middleware';
import { Request, Response, NextFunction } from 'express';


export class AuthMiddleware extends Middleware {
    public handle(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        
        verify(token, process.env.JWTSECRET!, (err, payload) => {
            if (err || typeof payload === 'string') {
                return res.status(401).send({ error: 'Invalid token' });
            } else {
                req.jwtPayload = payload as JwtPayload;
                next();
            }
        });
    }
}