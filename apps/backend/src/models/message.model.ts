import {
  AllowNull,
  Column,
  Comment,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

//留言
@Table({
  tableName: 't_message',
  timestamps: true,
})
export class MessageModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Comment('id')
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Comment('用户头像')
  @Column(DataType.STRING(300))
  avatar: string;

  @Comment('用户邮箱')
  @Column(DataType.STRING(150))
  email: string;

  @Comment('用户ip')
  @Column(DataType.STRING(40))
  ip: string;

  @Comment('用户主页')
  @Column(DataType.STRING(300))
  link: string;

  @Comment('用户名')
  @Column(DataType.STRING(40))
  username: string;

  @Comment('内容')
  @AllowNull(false)
  @Unique('content_unique')
  @Column(DataType.TEXT)
  content: string;

  @Comment('回复的id')
  @Column(DataType.UUID)
  replyId: string;

  parent: MessageModel;
}
