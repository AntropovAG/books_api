import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { BooksService } from './BooksService';
import { Request, Response } from 'express';
import { Controller } from '../Controllers';

@injectable()
export class BooksController {
    constructor(@inject(TYPES.BookService) private bookService: BooksService) {}

    public async getBooks(req: Request, res: Response) {
        try {
            const perPage = parseInt(req.query.perPage as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const categories = req.query.categories ? (req.query.categories as string).split(',') : [];
            const books = await this.bookService.getBooks(perPage, page, categories);
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async createBook(req: Request, res: Response) {
        const {name, price, year, currency, authors, categories} = req.body;
        if (!name || !price || !year || !currency || !authors || !categories) {
            return res.status(400).json({ error: 'Not all data provided. Data expected: name, price, year, currency, authors, categories' });
        }
        try {
            const book = await this.bookService.createBook(req.body);
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async updateBook(req: Request, res: Response) {
        try {
            const bookId = parseInt(req.params.id);
            const book = await this.bookService.updateBook(bookId, req.body);
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async deleteBook(req: Request, res: Response) {
        try {
            const bookId = parseInt(req.params.id);
            await this.bookService.deleteBook(bookId);
            res.json({ message: 'Book deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}