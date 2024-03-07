import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        code: number;
        data: unknown;
        message: string;
    };
    test(): {
        code: number;
        data: unknown;
        message: string;
    };
}
