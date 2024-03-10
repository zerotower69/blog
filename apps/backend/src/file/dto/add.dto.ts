import { BucketType } from '../file.options';

export class AddDto {
  hash: string;
  path?: string;
  filename: string;
  filesize: number;
  bucket?: BucketType;
  url?: string;
  is_img: boolean;
}
