import { PageDto } from '../page';
import { Allow } from 'class-validator';

export class ListDto extends PageDto {
  //标签名，模糊匹配
  @Allow()
  name: string;
}
