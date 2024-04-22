import { DynamicModule } from '@nestjs/common';
import { OSSConfig } from '@common/config';
export declare class OSSModule {
    static register(options: OSSConfig): DynamicModule;
}
