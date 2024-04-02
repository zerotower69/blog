import { IsInt, IsNotEmpty } from 'class-validator';

export class PageDto {
  @IsNotEmpty({
    message: '页码不能为空',
  })
  @IsInt({
    message: '页码必须是整数',
  })
  page: number;

  @IsNotEmpty({
    message: '分页数pageSize不能为空',
  })
  @IsInt({
    message: '分页数必须是整数',
  })
  pageSize: number;
}
