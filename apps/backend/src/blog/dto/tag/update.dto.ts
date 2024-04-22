import { IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
  @IsNotEmpty({
    message: '标签名不能为空',
  })
  name: string;
}
