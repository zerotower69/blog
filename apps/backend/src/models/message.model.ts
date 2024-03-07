import {AutoIncrement, Column, Comment, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

//留言
@Table({
    tableName:'t_message',
    timestamps:true
})
export class MessageModel extends Model{
    @AutoIncrement
    @PrimaryKey
    @Comment('id')
    @Column(DataType.INTEGER)
    id: number;
}