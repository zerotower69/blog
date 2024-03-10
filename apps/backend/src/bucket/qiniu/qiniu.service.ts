import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QiniuConfigService } from './qiniu.config.service';
import { QINIU_CONFIG_SERVICE } from './qiniu.constants';
import * as qiniu from 'qiniu';
import { auth, rs } from 'qiniu';
import { PutRespBody, QiniuZone } from './qiniu.options';

@Injectable()
export class QiniuService {
  constructor(
    @Inject(QINIU_CONFIG_SERVICE)
    private configService: QiniuConfigService,
  ) {}

  //getMac
  getMac(macOptions?: auth.digest.MacOptions): auth.digest.Mac {
    const options = this.configService.config;
    if (!Reflect.has(options, 'access_key')) {
      throw new InternalServerErrorException('access_key not exit');
    }
    if (!Reflect.has(options, 'secret_key')) {
      throw new InternalServerErrorException('secret_key not exit');
    }
    return new qiniu.auth.digest.Mac(options.access_key, options.secret_key, {
      ...(options.mac ?? {}),
    });
  }
  //getuploadToken
  getUploadToken(
    policyOptions?: rs.PutPolicyOptions,
    macOptions?: auth.digest.MacOptions,
  ) {
    const putPolicy = new qiniu.rs.PutPolicy({
      ...(policyOptions ?? {}),
    });
    const mac = this.getMac(macOptions);
    return putPolicy.uploadToken(mac);
  }

  getZone() {
    const options = this.configService.config;
    const key = options.zone;
    return qiniu.zone[key];
  }

  getConfConfig(options?: qiniu.conf.ConfigOptions) {
    options = {
      ...options,
    };
    const zone = this.getZone();
    const confConfig = new qiniu.conf.Config({
      ...options,
      zone: zone,
    });
    return confConfig;
  }

  /**
   * 表单方式上传本地文件
   * @param  localPath 本地文件路径
   * @param filename 上传的文件名
   */
  uploadLocalFile(
    localPath: string,
    filename: string | null = null,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = this.getConfConfig();
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const uploadToken = this.getUploadToken();
      formUploader.putFile(
        uploadToken,
        filename,
        localPath,
        putExtra,
        function (respErr, respBody, respInfo) {
          if (respErr) {
            reject(respErr);
          } else {
            resolve({
              body: respBody,
              info: respInfo,
            });
          }
        },
      );
    });
  }

  /**
   * 表单方式上传字节
   * @param data 字节数据
   * @param filename 文件名
   */
  uploadData(data: string, filename: string): Promise<PutRespBody> {
    return new Promise((resolve, reject) => {
      const config = this.getConfConfig();
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const uploadToken = this.getUploadToken();

      formUploader.put(
        uploadToken,
        filename,
        data,
        putExtra,
        function (respErr, respBody, respInfo) {
          if (respErr) {
            reject(respErr);
          } else {
            resolve({
              body: respBody,
              info: respInfo,
            });
          }
        },
      );
    });
  }

  /**
   * 表单方式上传可读流
   * @param rs 文件流（可读流）
   * @param filename 文件名
   */
  uploadStream(rs: NodeJS.ReadableStream, filename: string) {
    return new Promise((resolve, reject) => {
      const config = this.getConfConfig();
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const uploadToken = this.getUploadToken();
      formUploader.putStream(
        uploadToken,
        filename,
        rs,
        putExtra,
        function (respError, respBody, respInfo) {
          if (respError) {
            reject(respError);
          } else {
            resolve({
              body: respBody,
              info: respInfo,
            });
          }
        },
      );
    });
  }
}
