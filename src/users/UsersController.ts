import { Controller } from '../Controllers';
import { ValidateMiddleware } from '../ValidateMiddlware';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './UsersService';
import { AuthMiddleware } from './AuthMiddleware';
import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';


@injectable()
export class UsersController extends Controller {

    constructor(
        @inject(TYPES.UsersService) private usersService: UsersService
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
            },
            {
                path: '/books',
                method: 'get',
                fn: this.getUserBooks,
                middleware: [new AuthMiddleware()]
            }
        ]);
    }
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await this.usersService.registerUser(req.body);
            res.status(201).json({ token });
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await this.usersService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }

    public async getUserBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.jwtPayload!.id;
            if (!userId) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            const books = await this.usersService.getUserBooks(userId);
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    // public async findUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const id = parseInt(req.params.id);
    //         const user = await this.usersService.getUser(id);
    //         if (!user) {
    //             return res.status(404).json({ error: 'User not found' });
    //         }
    //         res.json(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}