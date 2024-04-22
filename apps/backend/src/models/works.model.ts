import { AutoIncrement, Column, Comment, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

//作品
@Table({
  tableName: 't_works',
  timestamps: true,
})
export class WorksModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Comment('id')
  @Column(DataType.INTEGER)
  id: number;
}
