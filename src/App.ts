import 'reflect-metadata';
import express, { Express } from 'express';
import { json } from 'body-parser';
import { injectable, inject } from 'inversify';
import { TYPES } from './TYPES';
import { BooksRouter } from './books/BooksRouter';
import { CategoriesRouter } from './categories/CategoriesRouter';
import { UsersRouter } from './users/UsersRouter';



@injectable()
export class App {
    private app: Express;
    private readonly port: number;
    private booksRouter: BooksRouter;
    private categoriesRouter: CategoriesRouter;
    private usersRouter: UsersRouter;

    constructor(
        @inject(TYPES.BooksRouter) booksRouter: BooksRouter,
        @inject(TYPES.CategoriesRouter) categoriesRouter: CategoriesRouter,
        @inject(TYPES.UsersRouter) usersRouter: UsersRouter,
    ) {
        this.app = express();
        this.port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
        this.booksRouter = booksRouter;
        this.categoriesRouter = categoriesRouter;
        this.usersRouter = usersRouter;
    }

    private configureRoutes() {
        this.app.use('/api/v1', this.booksRouter.router);
        this.app.use('/api/v1', this.categoriesRouter.router);
        this.app.use('/api/v1/user', this.usersRouter.router);

    }

    public async run() {
        this.app.use(json());
        this.configureRoutes();
        this.app.listen(this.port, () => {
            console.log(`Приложение запущено на порте ${this.port}!`);
        });
    }
}