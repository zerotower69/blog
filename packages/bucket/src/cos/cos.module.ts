import { Module, DynamicModule } from '@nestjs/common';
import { COSConfig } from '@common/config';
import { COS_OPTIONS } from './cos.constants';
import { CosService } from './cos.service';

@Module({
  providers: [CosService],
  exports: [CosService],
})
export class COSModule {
  static register(options: COSConfig): DynamicModule {
    return {
      global: options?.global ?? false,
      module: COSModule,
      providers: [
        {
          provide: COS_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
