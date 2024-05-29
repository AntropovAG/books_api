import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { UsersController } from './UsersController';

@injectable()
export class UsersRouter {
    private _router: Router;

    constructor(@inject(TYPES.UsersController) private usersController: UsersController) {
        this._router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this._router.post('/login', this.usersController.login.bind(this.usersController));
        this._router.post('/register', this.usersController.register.bind(this.usersController));
        // this._router.get('/:id', this.usersController.findUser.bind(this.usersController));
    }

    get router() {
        return this._router;
    }
}