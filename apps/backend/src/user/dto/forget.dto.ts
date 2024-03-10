import { IsNotEmpty } from 'class-validator';

export class ForgetDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @IsNotEmpty({
    message: '用户密码不能为空',
  })
  password: string;
}
