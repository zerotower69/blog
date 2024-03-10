import { Model, Table } from 'sequelize-typescript';

//文件分片，断点续传用
@Table({
  tableName: 't_file_chunk',
  timestamps: true,
})
export class FileChunkModel extends Model {}
