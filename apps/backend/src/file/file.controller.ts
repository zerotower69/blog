import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from './file.storage';

@ApiTags('文件模块')
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  //TODO:权限验证
  //上传图片
  @Post('/image/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage,
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() data: Record<string, any>) {
    return this.fileService.uploadImage(file);
  }
}
