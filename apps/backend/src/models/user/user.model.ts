import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Model,
  Table,
  Comment,
  Unique,
  BelongsToMany,
  AllowNull,
  NotNull,
} from 'sequelize-typescript';
import { ManyToMany } from 'typeorm';
import { RoleModel } from './role.model';
import { UserRoleModel } from './userRole.model';

@Table({
  //表名
  tableName: 't_user',
  //将自动生成createdAt和updatedAt这两个字段
  timestamps: true,
})
export class UserModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('用户名')
  @AllowNull(false)
  @NotNull
  @Unique('username_unique')
  @Column(DataType.STRING(50))
  username: string;

  @Comment('昵称')
  @Column(DataType.STRING(50))
  nickname: string;

  @Comment('密码')
  @Column(DataType.STRING(100))
  password: string;

  @BelongsToMany(() => RoleModel, () => UserRoleModel)
  roles: RoleModel[];
}
