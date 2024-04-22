export interface UploadFileOptions<B extends BucketType = 'qiniu'> {
  global?: boolean;
  uploadType?: 'local' | 'bucket';
  bucket?: B;
}

export type BucketType = 'qiniu' | 'oss' | 'cos';
