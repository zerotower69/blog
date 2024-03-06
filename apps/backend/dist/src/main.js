"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const winston_module_1 = require("./winston/winston.module");
const common_1 = require("@nestjs/common");
const config = (0, config_1.getConfig)();
const swaggerConfig = config['swagger'] ?? {
    enable: true,
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix(config?.server?.prefix ?? '/');
    app.useLogger(app.get(winston_module_1.WINSTON_LOGGER_TOKEN));
    if (swaggerConfig.enable) {
        const docConfig = new swagger_1.DocumentBuilder()
            .setTitle(swaggerConfig?.title ?? 'nest-template')
            .setDescription(swaggerConfig?.description ?? 'The API document')
            .setVersion(swaggerConfig?.version ?? '1.0.0');
        const tags = typeof swaggerConfig.tags === 'undefined'
            ? ['api']
            : typeof swaggerConfig.tags === 'string'
                ? [swaggerConfig.tags]
                : swaggerConfig.tags;
        tags.forEach((tag) => {
            docConfig.addTag(tag);
        });
        docConfig.build();
        const document = swagger_1.SwaggerModule.createDocument(app, docConfig);
        swagger_1.SwaggerModule.setup(swaggerConfig?.path ?? 'doc', app, document);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: common_1.HttpStatus.BAD_REQUEST,
        exceptionFactory: (errors) => {
            const message = Object.values(errors[0].constraints);
            return new common_1.BadRequestException({
                message: message,
                status: common_1.HttpStatus.BAD_REQUEST,
            });
        },
    }));
    await app.listen(config?.server?.port ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map