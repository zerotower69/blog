import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class HttpCodeInterceptor<T> implements NestInterceptor<T, T> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T>;
}
