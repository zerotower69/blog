import { QiniuConfig } from '@common/config';
export declare class QiniuConfigService {
    private readonly qiniuOptions;
    private options;
    constructor(qiniuOptions: QiniuConfig);
    get config(): QiniuConfig;
    set config(options: QiniuConfig);
}
