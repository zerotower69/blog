import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface';
import { UploadFileOptions } from './file.options';
import { FILE_MODULE_OPTIONS } from './file.constants';
import { FileService } from './file.service';
import { QiniuModule, QiniuService, QiniuOptions } from '../bucket';
import { FileController } from './file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from '../models/file/file.model';

@Module({
  imports: [QiniuModule.register({}), SequelizeModule.forFeature([FileModel])],
  providers: [FileService],
  controllers: [FileController],
  exports: [],
})
export class FileModule {
  static register(options: UploadFileOptions): DynamicModule {
    return {
      global: options?.global ?? false,
      module: FileModule,
      providers: [
        {
          provide: FILE_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
