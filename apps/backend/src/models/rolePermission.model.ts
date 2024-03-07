import {AutoIncrement, Column, Comment, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {RoleModel} from "./role.model";
import {PermissionModel} from "./permission.model";

@Table({
    tableName:'t_role_permission',
    timestamps:false
})
export class RolePermissionModel extends Model{
    @AutoIncrement
    @PrimaryKey
    @Comment('id')
    @Column(DataType.INTEGER)
    id: number;

    @Comment('角色id')
    @ForeignKey(()=>RoleModel)
    @Column(DataType.INTEGER)
    role_id:number

    @Comment('权限id')
    @ForeignKey(()=>PermissionModel)
    @Column(DataType.INTEGER)
    permission_id:number
}