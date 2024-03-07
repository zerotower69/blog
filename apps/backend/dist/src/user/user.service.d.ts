import { UserModel } from '../models/user.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgetDto } from "./dto/forget.dto";
import { RoleModel } from "../models";
export declare class UserService {
    private userModel;
    private roleModel;
    constructor(userModel: typeof UserModel, roleModel: typeof RoleModel);
    private logger;
    private redisClient;
    register(user: RegisterDto): Promise<{
        code: number;
        data: unknown;
        message: string;
    }>;
    login(user: LoginDto): Promise<UserModel>;
    getList(): Promise<{
        list: UserModel[];
        total: number;
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
    resetUserPassword(user: ForgetDto): Promise<void>;
    resetUserInfo(user: any): Promise<void>;
    resetAdminPassword(user: any): Promise<void>;
    resetUserRole(user: any): Promise<void>;
    getUserInfo(userId: number): Promise<void>;
    getListByPage(page?: number, limit?: number): Promise<{
        list: UserModel[];
        page: number;
        total: number;
    }>;
}
