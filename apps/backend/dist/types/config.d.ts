import type { Dialect, PoolOptions } from 'sequelize';
export type ServerConfig = {
    host: string;
    port: number | string;
    prefix: string;
};
export type JWTConfig = {
    secret: string;
    expireIn: string;
};
export type MySQLConfig = {
    host: string;
    port: number;
    dialect: Dialect;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
    autoLoadModels: boolean;
    timezone: string;
    logging: boolean | ((sql: string, timing?: number) => void);
    pool?: PoolOptions;
};
export type RedisConfig = {
    enable: boolean;
    host: string;
    port: number;
    username: string;
    enableAuth: boolean;
    password: string;
    db: number;
};
export type WinstonLevel = 'emerg' | 'alert' | 'crit' | 'error' | 'warning' | 'notice' | 'info' | 'debug';
export type LoggerConfig = {
    level: WinstonLevel;
    filename: string;
    dirname: string;
};
export type SwaggerConfig = {
    enable: boolean;
    title: string;
    description: string;
    version: string;
    tags: string | [string];
    path: string;
};
export type AppConfig = {
    server: ServerConfig;
    jwt: JWTConfig;
    mysql: Partial<MySQLConfig>;
    redis?: Partial<RedisConfig>;
    logger?: Partial<LoggerConfig>;
    swagger?: Partial<SwaggerConfig>;
};
