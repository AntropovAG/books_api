import { Controller } from './Controllers';
import { ValidateMiddleware } from './ValidateMiddlware';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './AuthService';
import { injectable, inject } from 'inversify';
import { TYPES } from './TYPES';
import { Router } from 'express';

@injectable()
export class AuthController extends Controller {

    constructor(
        @inject(TYPES.AuthService) private authService: AuthService
    ) {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                fn: this.register,
                middleware: [new ValidateMiddleware()],
            },
            {
                path: '/login',
                method: 'post',
                fn: this.login,
                middleware: [new ValidateMiddleware()],
            }
        ]);
    }
    private async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.authService.registerUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    private async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await this.authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}