import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { CategoriesController } from './CategoriesController';

@injectable()
export class CategoriesRouter {
    private _router: Router;

    constructor(@inject(TYPES.CategoriesController) private categoriesController: CategoriesController) {
        this._router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this._router.get('/categories', this.categoriesController.getCategories.bind(this.categoriesController));
        this._router.post('/categories', this.categoriesController.createCategory.bind(this.categoriesController));
        this._router.put('/categories/:id', this.categoriesController.updateCategory.bind(this.categoriesController));
        this._router.delete('/categories/:id', this.categoriesController.deleteCategory.bind(this.categoriesController));
    }

    get router() {
        return this._router;
    }
}