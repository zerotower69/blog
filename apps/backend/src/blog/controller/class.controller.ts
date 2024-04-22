import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ClassService } from '../service';
import { AddDto } from '../dto/class/add.dto';
import { UpdateDto } from '../dto/class/update.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../auth';
import { PageDto } from '../dto/page';
import { ListDto } from '../dto/class/list.dto';

@ApiTags('分类模块')
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}
  //查询所有
  @ApiOperation({
    summary: '查询所有的分类',
  })
  @Get('list')
  listAll() {
    return this.classService.listAll();
  }

  //按id查分类
  @ApiOperation({
    summary: '根据id查找分类',
  })
  @Get('find')
  findById(@Query('id') id: number) {
    return this.classService.findById(id);
  }

  //按分类名查分类详细信息
  @ApiOperation({
    summary: '按分类名查分类',
  })
  @Get('findByName')
  findByName(@Query('name') name: string) {
    return this.classService.findByName(name);
  }

  //分页查询分类
  @ApiOperation({
    summary: '分页查询分类',
  })
  @Post('getList')
  listByPage(@Body() data: ListDto) {
    return this.classService.listByPage(data);
  }

  /******/
  //新增分类
  @ApiOperation({
    summary: '新增分类',
  })
  @Role('admin')
  @Post('add')
  addClass(@Body() data: AddDto) {
    return this.classService.add(data);
  }

  //修改分类
  @ApiOperation({
    summary: '修改分类',
  })
  @Role('admin')
  @Post('update')
  updateClass(@Body() data: UpdateDto) {
    return this.classService.update(data.id, data);
  }

  //删除分类
  @ApiOperation({
    summary: '删除分类',
  })
  @Role('admin')
  @Get('delete')
  deleteClass(@Query('id') id: number) {
    return this.classService.deleteData(id.toString());
  }

  //批量删除分类
  @ApiOperation({
    summary: '批量删除分类',
  })
  @Role('admin')
  @Get('batch/delete')
  batchDeleteClass(@Query('ids') ids: string) {
    return this.classService.deleteData(ids);
  }
}
