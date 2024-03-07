import {AutoIncrement, Column, Comment, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

//关于
@Table({
    tableName:'t_about',
    timestamps:true
})
export class AboutModel extends Model{
    @AutoIncrement
    @PrimaryKey
    @Comment('id')
    @Column(DataType.INTEGER)
    id: number;
}