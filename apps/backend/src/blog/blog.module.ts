import { Module } from '@nestjs/common';
import { BlogController, TagController, ClassController, ArticleController } from './controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogService, TagService, ClassService } from './service';
import { ArticleClassModel, ArticleModel, ArticleTagModel, ClassModel, CommentModel, TagModel } from '../models';
import { ArticleService } from './service/article.service';

@Module({
  imports: [SequelizeModule.forFeature([ArticleModel, TagModel, ClassModel, CommentModel, ArticleClassModel, ArticleTagModel])],
  controllers: [BlogController, TagController, ClassController, ArticleController],
  providers: [BlogService, TagService, ClassService, ArticleService],
})
export class BlogModule {}
