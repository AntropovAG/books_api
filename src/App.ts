import 'reflect-metadata';
import express, { Express } from 'express';
import { json } from 'body-parser';
import { injectable, inject } from 'inversify';
import { TYPES } from './TYPES';
import { BooksRouter } from './books/BooksRouter';
import { CategoriesRouter } from './categories/CategoriesRouter';



@injectable()
export class App {
    private app: Express;
    private readonly port: number;
    private booksRouter: BooksRouter;
    // private authController: AuthController;
    private categoriesRouter: CategoriesRouter;

    constructor(
        @inject(TYPES.BooksRouter) booksRouter: BooksRouter,
        // @inject(TYPES.AuthController) authController: AuthController,
        @inject(TYPES.CategoriesRouter) categoriesRouter: CategoriesRouter
    ) {
        this.app = express();
        this.port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
        this.booksRouter = booksRouter;
        this.categoriesRouter = categoriesRouter;
        // this.authController = authController;
        // this.usersRouter = usersRouter;
    }

    private configureRoutes() {
        this.app.use('/api/v1', this.booksRouter.router);
        this.app.use('/api/v1', this.categoriesRouter.router);
        // this.app.use('/api/v1', this.authController.router);
        // this.app.use('/api/v1', this.usersRouter.router);

    }

    public async run() {
        this.app.use(json());
        this.configureRoutes();
        this.app.listen(this.port, () => {
            console.log(`Приложение запущено на порте ${this.port}!`);
        });
    }
}