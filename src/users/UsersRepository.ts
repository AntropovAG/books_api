import { DBService } from "../DBService";
import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { User } from "../interfaces/User.interface";

@injectable()
export class UsersRepository {
    constructor(@inject(TYPES.DBService) private dbService: DBService) { }

    public async createUser(data: User) {
        return this.dbService.client.user.create({
            data: { 
                username: data.username,
                email: data.email,
                password: data.password
            }
        });
    }

    public async findByUsername(username: string) {
        return this.dbService.client.user.findUnique({
            where: { username }
        });
    }

    public async findByLoginData(loginData: string) {
        return this.dbService.client.user.findFirst({
            where: {
                OR: [
                    { username: loginData },
                    { email: loginData }
                ]
            }
        });
    }

    public async getUserBooks(userId: number) {
        return this.dbService.client.userBooks.findMany({
            where: { userId }
        });
    
    }

    // public async findById(id: number) {
    //     return this.dbService.client.user.findUnique({
    //         where: { id }
    //     });
    // }

}
