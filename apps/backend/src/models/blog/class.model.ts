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
} from 'sequelize-typescript';
import { ArticleModel } from './article.model';
import { ArticleClassModel } from './articleClass.model';

@Table({
  tableName: 't_class',
  timestamps: true,
})
export class ClassModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('分类名')
  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING(40))
  name: string;

  @Comment('分类描述或说明')
  @Column(DataType.STRING(100))
  desc: string;

  @BelongsToMany(() => ArticleModel, () => ArticleClassModel)
  articles: ClassModel[];
}
