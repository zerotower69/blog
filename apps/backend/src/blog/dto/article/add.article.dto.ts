import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

//新增文章实体
export class AddArticleDto {
  @IsNotEmpty({
    message: '文章标题不能为空',
  })
  @IsString({
    message: '文章标题必须是字符串',
  })
  @Length(5, 30, {
    message: '文章标题必须在5-30字之间',
  })
  title: string;
  @IsNotEmpty({
    message: '文章内容不能为空',
  })
  content: string;

  @IsNotEmpty({
    message: '文章类别不能为空',
  })
  @IsEnum(['origin', 'others'], {
    message: '文章类型必须是原创或者转载二选一',
  })
  //文章类别
  type: string;
  //文章摘要
  @IsNotEmpty({
    message: '文章摘要不能为空',
  })
  abstract: string;
  @IsNotEmpty({
    message: '文章标签不能为空',
  })
  //标签id
  tagId?: number[];
  //分类id
  @IsNotEmpty({
    message: '文章分类不能为空',
  })
  classId?: number[];
}
