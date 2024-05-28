import { inject, injectable } from 'inversify';
import { TYPES } from './TYPES';
import { BookRepository } from './BooksRepository';

@injectable()
export class BooksService {
    constructor(@inject(TYPES.BookRepository) private bookRepository: BookRepository) {}

    public async getBooks() {
        return this.bookRepository.findAll();
    }

    public async getBooksByCategory(perPage: number, page: number, categories: string[]) {
        return this.bookRepository.findSome(perPage, page, categories);
    }

    public async createBook(data: any) {
        return this.bookRepository.createBook(data);
    }

    public async updateBook(id: number, data: any) {
        return this.bookRepository.updateBook(id, data);
    }

    public async deleteBook(id: number) {
        return this.bookRepository.deleteBook(id);
    }

    public async getBookById(id: number) {
        return this.bookRepository.findById(id);
    }
}