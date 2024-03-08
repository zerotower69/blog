import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  Comment,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

//评论
@Table({
  tableName: 't_comment',
  timestamps: true,
})
export class CommentModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Comment('id')
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Comment('评论内容')
  @Column(DataType.TEXT)
  content: string;

  @Comment('用户头像')
  @Column(DataType.STRING(300))
  avatar: string;

  @Comment('用户id')
  @Column(DataType.INTEGER)
  userId: number;

  @Comment('用户名')
  @Column(DataType.STRING(40))
  username: string;

  @Comment('用户邮箱')
  @Column(DataType.STRING(150))
  email: string;

  @Comment('用户网站')
  @Column(DataType.STRING(300))
  link: string;

  @Comment('是否被删除')
  @Column(DataType.BOOLEAN)
  is_delete: boolean;

  @Comment('是否被隐藏')
  @Column(DataType.BOOLEAN)
  is_hidden: boolean;

  @ForeignKey(() => CommentModel)
  @Column(DataType.INTEGER)
  parentId: number;

  @BelongsTo(() => CommentModel, 'parentId')
  parent: CommentModel;
}
