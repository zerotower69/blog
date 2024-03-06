import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class HelloFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
