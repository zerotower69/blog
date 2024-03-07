import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MyLogger } from "../winston/MyLogger";
export declare class UserController {
    private readonly userService;
    private jwtService;
    private logger;
    constructor(userService: UserService, jwtService: JwtService, logger: MyLogger);
    login(user: LoginDto, response: Response): Promise<{
        code: number;
        data: unknown;
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        code: number;
        data: {
            access_token: string;
            refresh_token: string;
        };
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
    getDetail(token: string): Promise<{
        code: number;
        data: unknown;
        message: string;
    }>;
    deleteOne(userId: number): Promise<{
        code: number;
        data: unknown;
        message: string;
    } | {
        code: 204;
        data: any;
        message: string;
    }>;
}
