import { DBService } from "../DBService";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";

@injectable()
export class CategoriesRepository {
    constructor(@inject(TYPES.DBService) private dbService: DBService) { }

    public async getCategories(perPage: number, page: number) {
        const skip = (page - 1) * perPage;
        const categoriesList = await this.dbService.client.category.findMany({
            skip,
            take: perPage,
        });
    
        return categoriesList;
    }

    public async createCategory(data: string) {
        return this.dbService.client.category.create({
            data: { name: data }
        });
    }

    public async updateCategory(id: number, data: string) {
        return this.dbService.client.category.update({
            where: { id },
            data: { name: data }
        });
    }

    public async deleteCategory(id: number) {
        return this.dbService.client.category.delete({
            where: { id }
        });
    }
}
