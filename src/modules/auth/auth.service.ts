// src/modules/auth/auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { BadRequestError, UnauthorizedError } from '../../core/errors';
import { BaseService } from '../../core/base.service';

export class AuthService extends BaseService<UserEntity> {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository);
    }

    async login(email: string, password: string): Promise<{ user: any; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password ?? ''))) {
            throw new UnauthorizedError('Invalid credentials');
        }

        const token = this.generateToken(user);
        await this.userRepository.updateLastLogin(user.id ?? 0);
        return { user: { id: user.id, name: user.username, email: user.emailId }, token };
    }

    async register(name: string, email: string, password: string): Promise<{ user: any; token: string }> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new BadRequestError('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({
            username: name, // Corrected field mapping
            emailId: email,
            password: hashedPassword,
        } as Partial<UserEntity>);
        const token = this.generateToken(user);
        return { user: { id: user.id, name: user.username, email: user.emailId }, token };
    }

    async refreshToken(refreshToken: string): Promise<{ token: string }> {
        // Implement refresh token logic here
        return { token: 'newToken' };
    }

    async forgotPassword(email: string): Promise<{ message: string }> {
        // Implement forgot password logic here
        return { message: 'Password reset link sent' };
    }

    async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
        // Implement reset password logic here
        return { message: 'Password reset successful' };
    }

    private generateToken(user: any): string {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }

    // Implement other BaseService methods if needed
}
