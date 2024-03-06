import { LoggerService } from '@nestjs/common';
import type { LoggerOptions } from 'winston';
export declare class MyLogger implements LoggerService {
    private logger;
    constructor(options: LoggerOptions);
    error(message: string, context: string): void;
    log(message: string, context: string): any;
    warn(message: string, context: string): any;
}
