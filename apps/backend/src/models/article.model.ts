import {
  Column,
  Comment,
  DataType,
  Model,
  PrimaryKey,
  Table,
  IsUUID,
  Default,
  AllowNull,
} from 'sequelize-typescript';

//文章
@Table({
  tableName: 't_article',
  timestamps: true,
})
export class ArticleModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Comment('id')
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Comment('内容')
  @Column(DataType.TEXT)
  content: string;
}
