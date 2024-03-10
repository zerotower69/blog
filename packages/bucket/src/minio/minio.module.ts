import { Module, DynamicModule } from '@nestjs/common';
import { MinioConfig } from '@common/config';

@Module({})
export class MinioModule {
  static register(options: MinioConfig): DynamicModule {
    return {
      global: options?.global ?? false,
      module: MinioModule,
    };
  }
}
