import {
  AutoIncrement,
  Column,
  Comment,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

//友链
@Table({
  tableName: 't_links',
  timestamps: true,
})
export class LinksModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('头像')
  @Column(DataType.STRING(300))
  avatar: string;

  @Comment('友链地址')
  @Column(DataType.STRING(300))
  link: string;

  @Comment('描述信息')
  @Column(DataType.STRING(100))
  desc: string;

  @Comment('名称')
  @Column(DataType.STRING(40))
  name: string;
}
