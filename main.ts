import 'reflect-metadata';
import { App } from './src/App';
import * as dotenv from 'dotenv';
import { Container } from 'inversify';
import { TYPES } from './src/TYPES';
import { BooksController } from './src/books/BooksController';
import { DBService } from './src/DBService';
import { BooksService } from './src/books/BooksService';
import { BookRepository } from './src/books/BooksRepository';
import { BooksRouter } from './src/books/BooksRouter';
import { CategoriesController } from './src/categories/CategoriesController';
import { CategoriesRouter } from './src/categories/CategoriesRouter';
import { CategoriesService } from './src/categories/CategoriesService';
import { CategoriesRepository } from './src/categories/CategoriesRepository';
import { UsersRepository } from './src/users/UsersRepository';
import { UsersController } from './src/users/UsersController';
import { UsersService } from './src/users/UsersService';
import { UsersRouter } from './src/users/UsersRouter';


dotenv.config();

async function bootstrap() {
    const iocContainer = new Container();
    iocContainer.bind<BooksController>(TYPES.BookController).to(BooksController);
    iocContainer.bind<BooksService>(TYPES.BookService).to(BooksService);
    iocContainer.bind<DBService>(TYPES.DBService).to(DBService);
    iocContainer.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
    iocContainer.bind<BooksRouter>(TYPES.BooksRouter).to(BooksRouter);
    iocContainer.bind<CategoriesController>(TYPES.CategoriesController).to(CategoriesController);
    iocContainer.bind<CategoriesRouter>(TYPES.CategoriesRouter).to(CategoriesRouter);
    iocContainer.bind<CategoriesService>(TYPES.CategoriesService).to(CategoriesService);
    iocContainer.bind<CategoriesRepository>(TYPES.CategoriesRepository).to(CategoriesRepository);
    iocContainer.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
    iocContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
    iocContainer.bind<UsersService>(TYPES.UsersService).to(UsersService);
    iocContainer.bind<UsersRouter>(TYPES.UsersRouter).to(UsersRouter);

    iocContainer.bind<App>(TYPES.App).to(App);
    const app = iocContainer.get<App>(TYPES.App);

    await app.run();
}

bootstrap();