import { inject, injectable } from 'inversify';
import { UsersRepository } from './UsersRepository';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { TYPES } from '../TYPES';

@injectable()
export class UsersService {
    constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepository) {}

    public async registerUser(userData: { username: string; password: string, email: string}) {
        const hashedPassword = await hash(userData.password, 10);

        const newUser = await this.usersRepository.createUser({ password: hashedPassword, username: userData.username, email: userData.email});
        const token = this.createToken(newUser.id, newUser.username);

        return token;
    }

    public async login(userData: { loginData: string; password: string }) {
        const user = await this.usersRepository.findByLoginData(userData.loginData);
        if (!user || !(await compare(userData.password, user.password))) {
            throw new Error('Invalid login, username or password');
        }

        const token = this.createToken(user.id, user.username); 

        return token;
    }

    private createToken(id: number, username: string) {
        return sign({ id, username }, process.env.JWTSECRET!, { expiresIn: '1h' });
    }


    public async getUserBooks(userId: number) {
        return this.usersRepository.getUserBooks(userId);
    }
    
    // public async getUser(id: number) {
    //     return this.usersRepository.findById(id);
    // }
}