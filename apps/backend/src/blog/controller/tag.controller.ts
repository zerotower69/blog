import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { TagService } from '../service';
import { PageDto } from '../dto/page';
import { AddDto } from '../dto/tag/add.dto';
import { Role } from '../../auth';
import { UpdateDto } from '../dto/tag/update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListDto } from '../dto/tag/list.dto';

@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  //查所有
  @ApiOperation({
    summary: '查所有',
    description: '查所有的标签',
  })
  @ApiResponse({})
  @Get('listAll')
  listAll() {
    return this.tagService.listAll();
  }

  //按id查
  @Get('find')
  listById(@Query('id') id: number) {
    return this.tagService.listById(id);
  }

  //分页查
  @Post('getList')
  listByPage(@Body() data: ListDto) {
    return this.tagService.listByPage(data);
  }

  //新增标签
  @Role('admin')
  @Post('add')
  add(@Body() data: AddDto) {
    return this.tagService.add(data.name);
  }

  //修改标签
  @Role('admin')
  @Post('update')
  update(@Body() data: UpdateDto) {
    return this.tagService.update(data.id, data.name);
  }

  //删除标签
  @Role('admin')
  @Get('delete')
  deleteByID(@Query('ids') ids: string) {
    return this.tagService.batchDelete(ids);
  }
}
