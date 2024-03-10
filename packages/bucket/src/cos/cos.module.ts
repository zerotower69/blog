import { Module, DynamicModule } from '@nestjs/common';
import { COSConfig } from '@common/config';

@Module({})
export class COSModule {
  static register(options: COSConfig): DynamicModule {
    return {
      global: options?.global ?? false,
      module: COSModule,
    };
  }
}
