import { Module, Type, DynamicModule, ForwardReference } from '@nestjs/common';
import {
  QiniuModule,
  QiniuService,
  COSModule,
  OSSModule,
  MinioModule,
} from '@common/bucket';
import { SequelizeModule } from '@nestjs/sequelize';
import { UploadFileOptions } from './file.options';
import { FILE_MODULE_OPTIONS } from './file.constants';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileModel } from '../models/file/file.model';
import { getBucketConfig } from '../config';

const qiniuConfig = getBucketConfig('qiniu');
const ossConfig = getBucketConfig('oss');
const cosConfig = getBucketConfig('cos');
const minioConfig = getBucketConfig('minio');

@Module({
  imports: [
    QiniuModule.register(qiniuConfig),
    COSModule.register(cosConfig),
    OSSModule.register(ossConfig),
    MinioModule.register(minioConfig),
    SequelizeModule.forFeature([FileModel]),
  ],
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
