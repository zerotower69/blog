import { DynamicModule } from '@nestjs/common';
import { MinioConfig } from '@common/config';
export declare class MinioModule {
    static register(options: MinioConfig): DynamicModule;
}
