import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { CategoriesRepository } from './CategoriesRepository';

@injectable()
export class CategoriesService {
    constructor(@inject(TYPES.CategoriesRepository) private categoriesRepository: CategoriesRepository) {}

    public async getCategories(perPage: number, page: number) {
        return this.categoriesRepository.getCategories(perPage, page);
    }

    public async createCategory(data: string) {
        return this.categoriesRepository.createCategory(data);
    }

    public async updateCategory(id: number, data: string) {
        return this.categoriesRepository.updateCategory(id, data);
    }

    public async deleteCategory(id: number) {
        return this.categoriesRepository.deleteCategory(id);
    }
}