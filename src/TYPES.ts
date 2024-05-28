import { AuthService } from "./AuthService";

export const TYPES = {
    App: Symbol.for("App"),
    BookController: Symbol.for("BookController"),
    BookService: Symbol.for("BookService"),
    DBService: Symbol.for("DBService"),
    BookRepository: Symbol.for("BookRepository"),
    BooksRouter: Symbol.for("BooksRouter"),
    UsersRouter: Symbol.for("UsersRouter"),
    CategoriesRouter: Symbol.for("CategoriesRouter"),
    AuthController: Symbol.for("AuthController"),
    AuthService: Symbol.for("AuthService"),
    UsersRepository: Symbol.for("UsersRepository"),
}  