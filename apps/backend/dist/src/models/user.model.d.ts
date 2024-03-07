import { Model } from 'sequelize-typescript';
import { RoleModel } from './role.model';
export declare class UserModel extends Model {
    id: number;
    username: string;
    nickname: string;
    password: string;
    roles: RoleModel[];
}
