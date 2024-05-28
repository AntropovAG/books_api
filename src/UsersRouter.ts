import { Router } from 'express';
import { User } from './interfaces/User.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './TYPES';
import { AuthController } from './AuthController';

export class UsersRouter {
    private _router: Router;

    constructor() {
        this._router = Router();

        this._router.get('/users', (req, res) => {
            res.send(usersPlaceholder);
        });

        this._router.get('/users/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const user = usersPlaceholder.find(user => user.id === id);
            res.send(user);
        });

        this._router.post('/users', (req, res) => {
            const user: User = req.body;
            usersPlaceholder.push(user);
            res.send(user);
        });

        this._router.delete('/users/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const index = usersPlaceholder.findIndex(user => user.id === id);
            usersPlaceholder.splice(index, 1);
            res.sendStatus(200);
        });
        // Add other CRUD routes (POST, PUT, DELETE) here
    }

    get router() {
        return this._router;
    }
}