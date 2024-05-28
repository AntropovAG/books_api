import { injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';

@injectable()
export class UsersRepository {
    private prisma = new PrismaClient();

    public async createUser(userData: { name: string; password: string; email: string; dob: string }) {
        return this.prisma.user.create({
            data: userData,
        });
    }

    public async findByUsername(name: string) {
        return this.prisma.user.findFirst({
            where: { name }, 
        });
    }
}