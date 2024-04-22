import { DynamicModule } from '@nestjs/common';
import { COSConfig } from '@common/config';
export declare class COSModule {
    static register(options: COSConfig): DynamicModule;
}
