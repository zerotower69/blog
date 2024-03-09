import { Allow, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty({
    message: '分类id不能为空',
  })
  @IsInt({
    message: '分类id必须是整数',
  })
  id: number;
  @Allow()
  name: string;
  @Allow()
  desc: string;
}
