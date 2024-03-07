import {AutoIncrement, Column, Comment, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

//友链
@Table({
    tableName:'t_links',
    timestamps:true
})
export class LinksModel extends Model{
    @AutoIncrement
    @PrimaryKey
    @Comment('id')
    @Column(DataType.INTEGER)
    id: number;


}