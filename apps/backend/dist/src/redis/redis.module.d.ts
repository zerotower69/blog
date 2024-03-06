import Redis, { RedisOptions } from 'ioredis';
export declare const REDIS_TOKEN = "REDIS_CLIENT";
export declare class RedisModule {
    static forRoot(options: RedisOptions): {
        module: typeof RedisModule;
        providers: {
            provide: string;
            useFactory(): Redis;
        }[];
        exports: string[];
    };
}
