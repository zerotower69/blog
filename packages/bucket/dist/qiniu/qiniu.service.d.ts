/// <reference types="node" />
import { QiniuConfigService } from './qiniu.config.service';
import * as qiniu from 'qiniu';
import { PutRespBody } from './qiniu.options';
export declare class QiniuService {
    private configService;
    constructor(configService: QiniuConfigService);
    getMac(macOptions?: qiniu.auth.digest.MacOptions): qiniu.auth.digest.Mac;
    getUploadToken(policyOptions?: qiniu.rs.PutPolicyOptions, macOptions?: qiniu.auth.digest.MacOptions): string;
    getZone(): qiniu.conf.Zone;
    getConfConfig(options?: qiniu.conf.ConfigOptions): qiniu.conf.Config;
    uploadLocalFile(localPath: string, filename?: string | null): Promise<any>;
    uploadData(data: string, filename: string): Promise<PutRespBody>;
    uploadStream(rs: NodeJS.ReadableStream, filename: string): Promise<unknown>;
}
