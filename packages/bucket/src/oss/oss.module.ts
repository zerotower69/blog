import { Module, DynamicModule } from '@nestjs/common';
import { OSSConfig } from '@common/config';

@Module({})
export class OSSModule {
  static register(options: OSSConfig): DynamicModule {
    return {
      global: options?.global ?? false,
      module: OSSModule,
    };
  }
}
