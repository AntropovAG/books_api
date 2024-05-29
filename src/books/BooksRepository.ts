import { DBService } from "../DBService";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { Book } from "../interfaces/Book.interface"


@injectable()
export class BookRepository {
    constructor(@inject(TYPES.DBService) private dbService: DBService) { }

    public async getBooks(perPage: number, page: number, categories: string[]) {
        const skip = (page - 1) * perPage;
        const booksList = await this.dbService.client.book.findMany({
            where: categories.length
                ? {
                    BookCategory: {
                        some: {
                            category: {
                                name: {
                                    in: categories,
                                },
                            },
                        },
                    },
                }
                : {
                    BookCategory: {
                        some: {},
                    },
                },
            skip,
            take: perPage,
            include: {
                BookCategory: {
                    include: {
                        category: true,
                    },
                },
                BookAuthors: {
                    include: {
                        author: true,
                    }
                },
                currency: true
            },
        });

        const booksWithAddedInfo = await Promise.all(booksList.map(async (book) => {
            const averageRating = await this.dbService.client.rating.aggregate({
                where: { bookId: book.id },
                _avg: { value: true }
            });
            return {
                ...book,
                averageRating: averageRating._avg.value || 0,
                authors: book.BookAuthors.map((bookAuthor) => bookAuthor.author.name),
                categories: book.BookCategory.map((bookCategory) => bookCategory.category.name)
            };
        }));
    
        return booksWithAddedInfo;
    }

    public async createBook(data: Book) {
        const { categories, authors, ...bookData } = data;

        const categoryIds = await this.dbService.client.category.findMany({
            where: {
                name: { in: categories }
            },
            select: {
                id: true
            }
        });

        const authorRecords = await Promise.all(authors.map(async (authorName: string) => {
            let authorRecord = await this.dbService.client.author.findUnique({
                where: { name: authorName }
            });

            if (!authorRecord) {
                authorRecord = await this.dbService.client.author.create({
                    data: { name: authorName }
                });
            }

            return authorRecord;
        }));

        const book = await this.dbService.client.book.create({
            data: {
                name: bookData.name,
                price: bookData.price,
                year: bookData.year,
                currency: { connect: { id: bookData.currency } },
                BookCategory: {
                    create: categoryIds.map((category: any) => ({
                        category: {
                            connect: { id: category.id }
                        }
                    }))
                },
                BookAuthors: {
                    create: authorRecords.map((author: any) => ({
                        author: {
                            connect: { id: author.id }
                        }
                    }))
                }
            }
        });

        return book;
    }

    public async updateBook(id: number, data: any) {
        const { categories, authors, ...bookData } = data;

        //Разботаем с категориями:

        const currentCategories = await this.dbService.client.bookCategory.findMany({
            where: { bookId: id },
            select: { categoryId: true }
        });
    
        const currentCategoryIds = currentCategories.map(c => c.categoryId);

        const categoryIds = categories? await this.dbService.client.category.findMany({
            where: {
                name: { in: categories }
            },
            select: {
                id: true
            }
        }) : [];

        const newCategoryIds = categoryIds.filter(category => !currentCategoryIds.includes(category.id));

        //Работаем с авторами:
        const currentAuthors = await this.dbService.client.bookAuthors.findMany({
            where: { bookId: id },
            select: { authorId: true }
        });

        const currentAuthorIds = currentAuthors.map(a => a.authorId);

        const authorRecords = authors? await Promise.all(authors.map(async (authorName: string) => {
            let authorRecord = await this.dbService.client.author.findUnique({
                where: { name: authorName }
            });

            if (!authorRecord) {
                authorRecord = await this.dbService.client.author.create({
                    data: { name: authorName }
                });
            }

            return authorRecord;
        })) : [];

        const newAuthorRecords = authorRecords.filter(author => !currentAuthorIds.includes(author.id));

        const book = await this.dbService.client.book.update({
            where: { id },
            data: {
                ...bookData,
                BookCategory: {
                    create: newCategoryIds.map((category: any) => ({
                        category: {
                            connect: { id: category.id }
                        }
                    }))
                },
                BookAuthors: {
                    create: newAuthorRecords.map((author: any) => ({
                        author: {
                            connect: { id: author.id }
                        }
                    }))
                }
            },
            include: {
                BookCategory: {
                    include: {
                        category: true
                    }
                },
                BookAuthors: {
                    include: {
                        author: true
                    }
                }
            }
        });
        return book;
    }

    public async deleteBook(id: number) {
        return this.dbService.client.book.delete({
            where: { id }
        });
    }

}
