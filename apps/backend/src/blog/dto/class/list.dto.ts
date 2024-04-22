import { PageDto } from '../page';
import { Allow } from 'class-validator';

export class ListDto extends PageDto {
  @Allow()
  //分类名
  name?: string;
  @Allow()
  startTime?: string;
  @Allow()
  endTime?: string;
}
