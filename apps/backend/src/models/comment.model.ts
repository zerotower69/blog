import {AutoIncrement, Column, Comment, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";


//评论
@Table({
    tableName:'t_comment',
    timestamps:true
})
export class CommentModel extends Model{
    @AutoIncrement
    @PrimaryKey
    @Comment('id')
    @Column(DataType.INTEGER)
    id: number;


}