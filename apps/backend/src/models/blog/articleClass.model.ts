import {
  AutoIncrement,
  Column,
  Comment,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ArticleModel } from './article.model';
import { ClassModel } from './class.model';

@Table({
  tableName: 't_article_class',
})
export class ArticleClassModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => ArticleModel)
  @Column(DataType.INTEGER)
  article_id: number;

  @ForeignKey(() => ClassModel)
  @Column(DataType.INTEGER)
  class_id: number;
}
