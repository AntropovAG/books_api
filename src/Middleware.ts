import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './interfaces/Middleware.interface';

    export abstract class Middleware implements IMiddleware {
        public handle(req: Request, res: Response, next: NextFunction) { }
    }

