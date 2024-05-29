import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { BookRepository } from './BooksRepository';

interface Book {
    id: number;
    name: string;
    price: number;
    year: number;
    currency: number;
    rating: number;
    authors: string[];
    categories: string[];
}

@injectable()
export class BooksService {
    constructor(@inject(TYPES.BookRepository) private bookRepository: BookRepository) {}

    public async getBooks(perPage: number, page: number, categories: string[]) {
        return this.bookRepository.getBooks(perPage, page, categories);
    }

    public async createBook(data: Book) {
        return this.bookRepository.createBook(data);
    }

    public async updateBook(id: number, data: any) {
        return this.bookRepository.updateBook(id, data);
    }

    public async deleteBook(id: number) {
        return this.bookRepository.deleteBook(id);
    }
}