import {
  AllowNull,
  AutoIncrement,
  Column,
  Comment,
  DataType,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 't_permission',
  timestamps: true,
})
export class PermissionModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('权限名')
  @AllowNull(false)
  @NotNull
  @Unique('name_unique')
  @Column(DataType.STRING(50))
  name: string;

  @Comment('权限描述')
  @Column(DataType.STRING(150))
  desc: string;
}
