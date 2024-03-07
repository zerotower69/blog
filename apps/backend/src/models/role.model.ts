import {
  AutoIncrement, BelongsToMany,
  Column,
  Comment,
  DataType,
  Model,
  PrimaryKey,
  Table, Unique,
} from 'sequelize-typescript';
import {PermissionModel} from "./permission.model";
import {ManyToMany} from "typeorm";
import {RolePermissionModel} from "./rolePermission.model";

@Table({
  tableName: 't_role',
  timestamps: true,
})
export class RoleModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('角色标识')
  @Unique
  @Column(DataType.STRING(30))
  code: string;

  @Comment('角色名(中文)')
  @Column(DataType.STRING(30))
  name: string;

  @BelongsToMany(()=>PermissionModel,()=>RolePermissionModel)
  permissions:PermissionModel[]
}
