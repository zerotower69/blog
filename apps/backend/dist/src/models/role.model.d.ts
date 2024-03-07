import { Model } from 'sequelize-typescript';
import { PermissionModel } from "./permission.model";
export declare class RoleModel extends Model {
    id: number;
    code: string;
    name: string;
    permissions: PermissionModel[];
}
