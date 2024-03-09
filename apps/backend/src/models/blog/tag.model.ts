import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  Comment,
  DataType,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ArticleModel } from './article.model';
import { ArticleTagModel } from './articleTag.model';

//标签
@Table({
  tableName: 't_tag',
  timestamps: true,
})
export class TagModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('标签名')
  @AllowNull(false)
  @NotNull
  @Unique('name_unique')
  @Column(DataType.STRING(20))
  name: string;

  @BelongsToMany(() => ArticleModel, () => ArticleTagModel)
  articles: ArticleModel[];
}
