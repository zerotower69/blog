import { IsNotEmpty, Allow } from 'class-validator';

export class AddDto {
  @IsNotEmpty({
    message: '分类名不能为空',
  })
  name: string;
  //描述，可为空
  @Allow()
  desc: string;
}
