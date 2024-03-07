import {Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import {Res} from "./response"
import {Perm} from "./auth/permission.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return Res.OK()
  }

  @Get('bb')
  @Perm('user:del')
  test(){
    return Res.OK('测试')
  }
}
