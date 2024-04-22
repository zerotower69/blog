import * as COS from 'cos-nodejs-sdk-v5';
import { COSConfig } from '@common/config';
export declare class CosService {
    private cosOptions;
    private options;
    constructor(cosOptions: COSConfig);
    getInstance(options?: COS.COSOptions): COS;
    uploadFile(filepath: string, filename: string, key?: string): Promise<COS.UploadFileResult>;
    deleteFile(filepath: string): Promise<COS.DeleteObjectResult>;
}
