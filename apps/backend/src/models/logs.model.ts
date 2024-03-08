import {
  AutoIncrement,
  Column,
  Comment,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 't_logs',
})
export class LogsModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;

  @Comment('日志内容')
  @Column(DataType.TEXT)
  content: string;
}
