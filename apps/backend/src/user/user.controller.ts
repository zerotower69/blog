import { Body, Controller, Delete, Get, Inject, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Response } from 'express';
import { Res as ResBody } from '../response';
import { Auth } from '../auth';
import { WINSTON_LOGGER_TOKEN } from '../winston/winston.module';
import { MyLogger } from '../winston/MyLogger';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

ApiTags('用户模块');
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(WINSTON_LOGGER_TOKEN)
    private logger: MyLogger,
  ) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const tokens = this.userService.getToken(foundUser);
      return ResBody.OKWithData(
        {
          ...tokens,
        },
        '登录成功',
      );
    } else {
      return ResBody.Error('登录失败');
    }
  }

  //TODO:完善退出登录逻辑
  @Get('logout')
  async logout() {
    return ResBody.OK();
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.getUserInfo(data.userId);
      const tokens = this.userService.getToken(user);
      return ResBody.OKWithData({
        ...tokens,
      });
    } catch (e) {
      throw new UnauthorizedException('登录超时，请重新登录');
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

  @Get('getUserInfo')
  async getDetail(@Req() req: Request) {
    try {
      console.log('获取用户信息');
      const token = req.header('authorization').split(' ').pop();
      const data = this.jwtService.verify(token);
      const user = await this.userService.getUserInfo(data.user.id);
      if (user) {
        return ResBody.OKWithData(user);
      } else {
        return ResBody.Error();
      }
    } catch (e) {
      console.log(e);
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException(new Error('登录已过期'));
      } else {
        return ResBody.ServerError(e.message);
      }
    }
  }

  @Delete('/')
  deleteOne(@Query('id') userId: number) {
    return this.userService.deleteOne(userId);
  }
}
