import { Inject, Injectable, Optional } from '@nestjs/common';
import { QiniuConfig } from '@common/config';
import { QINIU_MODULE_OPTIONS } from './qiniu.constants';

@Injectable()
export class QiniuConfigService {
  private options: QiniuConfig = {};
  constructor(
    @Optional()
    @Inject(QINIU_MODULE_OPTIONS)
    private readonly qiniuOptions: QiniuConfig,
  ) {
    this.options = Object.assign(this.options, qiniuOptions);
  }

  get config(): QiniuConfig {
    return this.options;
  }
  set config(options: QiniuConfig) {
    this.options = Object.assign(this.options, options);
  }
}
