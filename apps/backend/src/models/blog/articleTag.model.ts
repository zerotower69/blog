import { AutoIncrement, Column, Comment, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ArticleModel } from './article.model';
import { TagModel } from './tag.model';

@Table({
  tableName: 't_article_tag',
  timestamps: false,
})
export class ArticleTagModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => ArticleModel)
  @Column(DataType.INTEGER)
  article_id: number;

  @ForeignKey(() => TagModel)
  @Column(DataType.INTEGER)
  tag_id: number;
}
