import { inject, injectable } from 'inversify';
import { TYPES } from './TYPES';
import { BooksService } from './BooksService';
import { Request, Response } from 'express';
import { Controller } from './Controllers';

@injectable()
export class BooksController {
    constructor(@inject(TYPES.BookService) private bookService: BooksService) {}

    public async getAllBooks(req: Request, res: Response) {
        try {
            const books = await this.bookService.getBooks();
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getBooksByCategory(req: Request, res: Response) {
        try {
            const perPage = parseInt(req.query.perPage as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const categories = req.query.categories ? (req.query.categories as string).split(',') : [];
            const books = await this.bookService.getBooksByCategory(perPage, page, categories);
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async createBook(req: Request, res: Response) {
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

    public async getBookById(req: Request, res: Response) {
        try {
            const bookId = parseInt(req.params.id);
            const book = await this.bookService.getBookById(bookId);
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.json(book);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}