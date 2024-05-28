import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from './TYPES';
import { BooksController } from './BooksController';

@injectable()
export class BooksRouter {
    private _router: Router;

    constructor(@inject(TYPES.BookController) private bookController: BooksController) {
        this._router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this._router.get('/books', this.bookController.getAllBooks.bind(this.bookController));
        this._router.get('/books/category', this.bookController.getBooksByCategory.bind(this.bookController));
        this._router.post('/books', this.bookController.createBook.bind(this.bookController));
        this._router.get('/books/:id', this.bookController.getBookById.bind(this.bookController));
        this._router.put('/books/:id', this.bookController.updateBook.bind(this.bookController));
        this._router.delete('/books/:id', this.bookController.deleteBook.bind(this.bookController));
    }

    get router() {
        return this._router;
    }
}