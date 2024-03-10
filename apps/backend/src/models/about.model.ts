import { AllowNull, AutoIncrement, Column, Comment, DataType, Model, NotNull, PrimaryKey, Table } from 'sequelize-typescript';

//关于
@Table({
  tableName: 't_about',
  timestamps: true,
})
export class AboutModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('内容')
  @AllowNull(false)
  @NotNull
  @Column(DataType.TEXT)
  content: string;

  @Comment('是不是关于我')
  @Column(DataType.BOOLEAN)
  is_me: string;
}
