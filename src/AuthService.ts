import { injectable } from 'inversify';
import { UsersRepository } from './UsersRepository';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@injectable()
export class AuthService {
    constructor(private userRepository: UsersRepository) {}

    public async registerUser(userData: { username: string; password: string }) {
        const hashedPassword = await hash(userData.password, 10);
        return this.userRepository.createUser({ email: "", dob: "", password: hashedPassword, name: userData.username});
    }

    public async login(userData: { username: string; password: string }) {
        const user = await this.userRepository.findByUsername(userData.username);
        if (!user || !(await compare(userData.password, user.password))) {
            throw new Error('Invalid username or password');
        }

        const token = sign({ id: user.id, username: user.name }, process.env.JWTSECRET!, {
            expiresIn: '1h',
        });

        return token;
    }
}