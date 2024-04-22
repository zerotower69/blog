import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from '../service/article.service';
import { AddArticleDto } from '../dto/article/add.article.dto';
import { Auth, Role } from '../../auth';
import { ModifyArticleDto } from '../dto/article/modify.article.dto';
import { PageDto } from '../dto/page';
import { ArticlePageDto } from '../dto/article/article.page.dto';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @ApiOperation({
    summary: '新增文章',
    description: '新增文章',
  })
  @Role('admin')
  @Post('add')
  addArticle(@Body() data: AddArticleDto) {
    return this.articleService.addArticle(data);
  }

  @ApiOperation({
    summary: '删除一篇文章',
    description: '给定id,删除一篇文章',
  })
  @Role('admin')
  @Get('delete')
  deleteArticle(@Query('id') id: string, @Query('soft_delete') softDelete: boolean) {
    return this.articleService.deleteArticle([id], softDelete);
  }

  @ApiOperation({
    summary: '批量删除文章',
  })
  @Role('admin')
  //批量删除文章
  @Get('/batch/Delete')
  batchDeleteArticle(@Query('ids') ids: string, @Query('soft_delete') softDelete: boolean) {
    const idList = ids.split(',');
    return this.articleService.deleteArticle(idList, softDelete);
  }

  @ApiOperation({
    summary: '更新文章',
  })
  @Role('admin')
  @Post('update')
  updateArticle(@Body() data: ModifyArticleDto) {
    const id = data.id;
    Reflect.deleteProperty(data, 'id');
    return this.articleService.modifyArticle(id, data);
  }

  @ApiOperation({
    summary: '分页查询文章',
    description: '可以按创建时间范围检索，支持时间正序和时间逆序，支持控制软删除数据的显隐，支持文章标题按模糊匹配',
  })
  //按分页查询文章
  @Post('getList')
  listArticle(@Body('page') page: number, @Body('pageSize') pageSize: number, @Body('filter') data: ArticlePageDto) {
    return this.articleService.listArticleByPage(page, pageSize, data);
  }

  @ApiOperation({
    summary: 'web端根据文章Id获取文章详情',
  })
  @Get('details')
  getArticleDetails(@Query('id') id: string) {
    return this.articleService.getArticleDetails(id);
  }

  @ApiOperation({
    summary: '管理端根据文章Id获取文章详情',
  })
  @Get('/admin/details')
  adminGetArticleDetails(@Query('id') id: string) {
    return this.articleService.adminGetArticleDetails(id);
  }
}
