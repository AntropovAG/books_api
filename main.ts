import 'reflect-metadata';
import { App } from './src/App';
import * as dotenv from 'dotenv';
import { Container } from 'inversify';
import { TYPES } from './src/TYPES';
import { BooksController } from './src/BooksController';
import { DBService } from './src/DBService';
import { BooksService } from './src/BooksService';
import { BookRepository } from './src/BooksRepository';
import { BooksRouter } from './src/BooksRouter';
import { AuthController } from './src/AuthController';
import { AuthService } from './src/AuthService';
import { UsersRepository } from './src/UsersRepository';


dotenv.config();

async function bootstrap() {
    const iocContainer = new Container();
    iocContainer.bind<BooksController>(TYPES.BookController).to(BooksController);
    iocContainer.bind<BooksService>(TYPES.BookService).to(BooksService);
    iocContainer.bind<DBService>(TYPES.DBService).to(DBService);
    iocContainer.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
    iocContainer.bind<BooksRouter>(TYPES.BooksRouter).to(BooksRouter);
    // iocContainer.bind<AuthController>(TYPES.AuthController).to(AuthController);
    // iocContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
    // iocContainer.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
    iocContainer.bind<App>(TYPES.App).to(App);
    const app = iocContainer.get<App>(TYPES.App);

    await app.run();
}

bootstrap();