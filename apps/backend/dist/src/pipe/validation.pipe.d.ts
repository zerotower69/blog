import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class MyValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
