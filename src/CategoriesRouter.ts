import { Router } from 'express';
import { Category } from './interfaces/Category.interface';

const categoriesPlaceholder: Category[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' }
];

export class CategoriesRouter {
    private _router: Router;

    constructor() {
        this._router = Router();

        this._router.get('/categories', (req, res) => {
            res.send(categoriesPlaceholder);
        });

        // Add other CRUD routes (POST, PUT, DELETE) here
    }

    get router() {
        return this._router;
    }
}