import {
  Body,
  Controller, Delete,
  Get,
  Inject,
  Post, Query,
  Res, UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Res as ResBody } from '../response';
import { LoginGuard } from '../auth/login.guard';
import { Auth } from '../auth/auth.decorator';
import {WINSTON_LOGGER_TOKEN} from "../winston/winston.module";
import {MyLogger} from "../winston/MyLogger";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(WINSTON_LOGGER_TOKEN)
    private logger:MyLogger
  ) {}

  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const data={
        user: {
          id: foundUser.id,
          username: foundUser.username,
          roles:foundUser.roles
        },
      }
      const payload = JSON.stringify(data)

      //令牌token
      //@ts-ignore
      const access_token = await this.jwtService.signAsync(data,{
        expiresIn:'30m'
      });
      //刷新token
      const refresh_token = await this.jwtService.signAsync({
        userId:foundUser.id
      },{
        expiresIn:'7d'
      })
      return ResBody.OK('登录成功',200,{
        access_token,
        refresh_token
      });
    } else {
      return ResBody.Error('登录失败');
    }
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken:string){
    try{
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.getUserInfo(data.userId);
      const payload = {
        user:{
          userId:user.id,
          username:user.username,
          roles:user.roles
        }
      }
      const access_token = this.jwtService.sign(payload,{
        expiresIn:"30m"
      })
      const refresh_token = this.jwtService.sign({
        userId:user.id
      },{
        expiresIn:"7d"
      });
      return ResBody.OKWithData({
        access_token,
        refresh_token
      })
    } catch (e){
      throw new UnauthorizedException('登录超时，请重新登录')
    }
  }

  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.userService.register(user);
  }

  @Auth()
  @Get('all')
  getAll() {
    return this.userService.getList();
  }

  @Get('getDetail')
  async getDetail(@Query('token') token:string){
     try {
       const data = this.jwtService.verify(token);
       const user = await this.userService.getUserInfo(data.user.id);
       if(user){
         return ResBody.OKWithData(user)
       } else{
         return ResBody.Error()
       }
     } catch (e){
       return ResBody.ServerError(e.message)
     }
  }

  @Delete('/')
  deleteOne(@Query('id') userId:number){
    return this.userService.deleteOne(userId)
  }
}
