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
  Unique,
  BelongsToMany,
  NotNull,
} from 'sequelize-typescript';
import { TagModel } from './tag.model';
import { ArticleTagModel } from './articleTag.model';
import { ClassModel } from './class.model';
import { ArticleClassModel } from './articleClass.model';

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

  @Comment('文章标题')
  @Unique('title_unique')
  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING(100))
  title: string;

  @Comment('文章摘要')
  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING(100))
  abstract: string;

  @Comment('文章内容')
  @AllowNull(false)
  @NotNull
  @Column(DataType.TEXT)
  content: string;

  @BelongsToMany(() => TagModel, () => ArticleTagModel)
  tags: TagModel[];

  @BelongsToMany(() => ClassModel, () => ArticleClassModel)
  classes: ClassModel[];

  @Comment('文章类型，origin：原创;others:转载')
  @Default('origin')
  @Column(DataType.ENUM('origin', 'others'))
  type: string;

  @Comment('原文链接，仅在type为others有效')
  @Column(DataType.STRING(300))
  origin_link: string;

  @Comment('文章是否删除（软删除）')
  @Column(DataType.BOOLEAN)
  is_delete: boolean;

  @Comment('喜欢数')
  @Default(0)
  @Column(DataType.INTEGER)
  like: number;

  @Comment('阅读数')
  @Default(0)
  @Column(DataType.INTEGER)
  read: number;

  @Comment('文章封面')
  @Column(DataType.STRING(500))
  banner: string;
}
