import { DynamicModule } from '@nestjs/common';
import { LoggerOptions } from 'winston';
export declare const WINSTON_LOGGER_TOKEN = "WINSTON_LOGGER";
export declare class WinstonModule {
    static forRoot(options: LoggerOptions): DynamicModule;
}
