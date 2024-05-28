import { Middleware } from './Middleware';
import { Request, Response, NextFunction } from 'express';

export class ValidateMiddleware extends Middleware {
    public handle(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(422).send({ error: 'No username or password' });
        }

        if (typeof username !== 'string' || typeof password !== 'string' || password.length < 6) {
            return res.status(422).send({ error: 'Invalid username or password' });
        }

        next();
    }
}