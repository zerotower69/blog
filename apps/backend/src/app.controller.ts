import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Res } from './response';
import { Perm } from './auth/permission.decorator';
import { Role } from './auth/role.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return Res.OK();
  }

  @Get('testPermission')
  @Perm('user:del')
  testPer() {
    return Res.OK('测试');
  }
  @Get('testRole')
  @Role('admin')
  testRole() {
    return Res.OK('只有管理员才能访问的接口');
  }

  @Get('getWebInfo')
  getWebInfo(@Query('link') link: string) {
    return this.appService.getWebInfo(link);
  }
}
