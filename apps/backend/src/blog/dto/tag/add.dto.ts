import { IsNotEmpty } from 'class-validator';

export class AddDto {
  @IsNotEmpty({
    message: '标签名不能为空',
  })
  name: string;
}
