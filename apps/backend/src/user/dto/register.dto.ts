import {IsNotEmpty, Length} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Length(4,20,{
    message:'用户名在4-20位之间'
  })
  username: string;

  @IsNotEmpty({
    message:'昵称不为空'
  })
  nickname:string;

  //TODO:注册密码安全性检测
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
