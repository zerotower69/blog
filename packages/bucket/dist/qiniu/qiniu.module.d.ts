import { DynamicModule } from '@nestjs/common';
import { QiniuOptions } from './qiniu.options';
export declare class QiniuModule {
    static register(options: QiniuOptions): DynamicModule;
}
