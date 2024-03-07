import {AutoIncrement, Column, Comment, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

//标签
@Table({
    tableName:'t_tag',
    timestamps:true
})
export class TagModel extends Model{
    @AutoIncrement
    @PrimaryKey
    @Comment('id')
    @Column(DataType.INTEGER)
    id: number;
}