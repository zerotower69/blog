import {
  AllowNull,
  AutoIncrement,
  Column,
  Comment,
  DataType,
  Default,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 't_file',
  timestamps: true,
})
export class FileModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  //hash
  @Comment('hash')
  @AllowNull(false)
  @NotNull
  @Column(DataType.TEXT)
  hash: string;

  @Comment('文件路径，本地')
  @Column(DataType.STRING(200))
  path: string;

  @Comment('文件名')
  @Column(DataType.STRING(100))
  filename: string;

  @Comment('文件大小')
  @Column(DataType.INTEGER)
  filesize: string;

  @Comment('存储桶类型')
  @Column(DataType.ENUM('qiniu', 'oss', 'cos', 'minio'))
  bucket: string;

  //url
  @Comment('存放于对象存储时，文件的链接')
  @Column(DataType.TEXT)
  url: string;

  @Comment('该文件是否是图片')
  @AllowNull(false)
  @NotNull
  @Column(DataType.BOOLEAN)
  is_img: boolean;
}
