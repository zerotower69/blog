import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: LoginDto, response: Response): Promise<{
        code: number;
        data: unknown;
        message: string;
    }>;
    register(user: RegisterDto): Promise<{
        code: number;
        data: unknown;
        message: string;
    }>;
    getAll(): Promise<{
        list: import("../models").UserModel[];
        total: number;
    }>;
}
