import { UserModel } from '../models/user.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof UserModel);
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
    getListByPage(page?: number, limit?: number): Promise<{
        list: UserModel[];
        page: number;
        total: number;
    }>;
}
