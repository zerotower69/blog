import * as COS from 'cos-nodejs-sdk-v5';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { COS_OPTIONS } from './cos.constants';
import { COSConfig } from '@common/config';

@Injectable()
export class CosService {
  private options: COSConfig = {};
  constructor(
    @Optional()
    @Inject(COS_OPTIONS)
    private cosOptions: COSConfig,
  ) {
    this.options = Object.assign(this.options, cosOptions);
  }

  getInstance(options: COS.COSOptions = {}) {
    return new COS(options);
  }

  //上传文件
  async uploadFile(filepath: string, filename: string, key?: string) {
    try {
      const instance = this.getInstance({
        SecretId: this.options.secret_id,
        SecretKey: this.options.secret_key,
      });
      if (key) {
        key = key + '/' + filename;
      } else {
        key = filename;
      }
      const options: COS.UploadFileParams = {
        FilePath: filepath,
        Bucket: this.options.bucket,
        Region: this.options.region,
        Key: key,
      };
      const result = await instance.uploadFile(options);
      if (result.statusCode === 200) {
        const location = result.Location;
        const paths = location.split('/');
        paths[0] = 'https://' + this.options.url;
        result.Location = paths.join('/');
      }
      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //删除文件
  async deleteFile(filepath: string) {
    try {
      const keys = filepath.split('/');
      if (keys[0].indexOf(this.options.url) > -1) {
        keys.shift();
      }
      const instance = this.getInstance({ SecretId: this.options.secret_id, SecretKey: this.options.secret_key });
      const options: COS.DeleteObjectParams = {
        Bucket: this.options.bucket,
        Region: this.options.region,
        Key: keys.join('/'),
      };
      const result = await instance.deleteObject(options);
      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
