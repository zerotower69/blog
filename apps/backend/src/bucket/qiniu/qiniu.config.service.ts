import { Inject, Injectable, Optional } from '@nestjs/common';
import { QiniuOptions } from './qiniu.options';
import { QINIU_MODULE_OPTIONS } from './qiniu.constants';

@Injectable()
export class QiniuConfigService {
  private options: QiniuOptions = {};

  constructor(
    @Optional()
    @Inject(QINIU_MODULE_OPTIONS)
    private readonly qiniuOptions: QiniuOptions,
  ) {
    this.options = Object.assign(this.options, qiniuOptions);
  }

  get config(): QiniuOptions {
    return this.options;
  }
  set config(options: QiniuOptions) {
    this.options = Object.assign(this.options, options);
  }
}
