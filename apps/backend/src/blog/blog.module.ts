import { Module } from '@nestjs/common';
import { BlogController, TagController, ClassController } from './controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogService, TagService, ClassService } from './service';
import { ArticleModel, ClassModel, CommentModel, TagModel } from '../models';

@Module({
  imports: [SequelizeModule.forFeature([ArticleModel, TagModel, ClassModel, CommentModel])],
  controllers: [BlogController, TagController, ClassController],
  providers: [BlogService, TagService, ClassService],
})
export class BlogModule {}
