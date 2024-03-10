import { Module, DynamicModule } from '@nestjs/common';
import { QiniuService } from './qiniu.service';
import { QiniuOptions } from './qiniu.options';
import { QINIU_MODULE_OPTIONS, QINIU_CONFIG_SERVICE } from './qiniu.constants';
import { QiniuConfigService } from './qiniu.config.service';

@Module({
  imports: [],
  providers: [QiniuService],
  exports: [QiniuService],
})
export class QiniuModule {
  static register(options: QiniuOptions): DynamicModule {
    return {
      global: options?.global ?? false,
      module: QiniuModule,
      providers: [
        {
          provide: QINIU_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: QINIU_CONFIG_SERVICE,
          useClass: QiniuConfigService,
        },
      ],
    };
  }
}
