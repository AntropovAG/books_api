import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { CategoriesService } from './CategoriesService';
import { Request, Response } from 'express';

@injectable()
export class CategoriesController {
    constructor(@inject(TYPES.CategoriesService) private categoriesService: CategoriesService) {}

    public async getCategories(req: Request, res: Response) {
        try {
            const perPage = parseInt(req.query.perPage as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const categories = await this.categoriesService.getCategories(perPage, page);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async createCategory(req: Request, res: Response) {
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Not all data provided. Data expected: name' });
        }
        try {
            const category = await this.categoriesService.createCategory(name);
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async updateCategory(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.id);
            const category = await this.categoriesService.updateCategory(categoryId, req.body.name);
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async deleteCategory(req: Request, res: Response) {
        try {
            const categoryId = parseInt(req.params.id);
            await this.categoriesService.deleteCategory(categoryId);
            res.json({ message: 'Category deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}