import { PageDto } from '../page';
import { Allow, IsBoolean } from 'class-validator';

//
export class ArticlePageDto {
  //结果正序还是逆序
  @Allow()
  desc?: boolean;
  //查找时间范围的数据
  @Allow()
  startTime?: string;
  @Allow()
  endTime?: string;
  @Allow()
  //文章标题
  title: string;
  @Allow()
  //允许显示被删除的文章（软删除）
  showDelete: boolean;
  @Allow()
  //标签id
  tagsId?: number[];
  @Allow()
  //分类id
  classesId?: number[];
}
