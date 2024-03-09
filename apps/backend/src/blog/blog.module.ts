import { Module } from '@nestjs/common';
import { BlogController, TagController } from './controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogService, TagService } from './service';
import { ArticleModel, ClassModel, CommentModel, TagModel } from '../models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ArticleModel,
      TagModel,
      ClassModel,
      CommentModel,
    ]),
  ],
  controllers: [BlogController, TagController],
  providers: [BlogService, TagService],
})
export class BlogModule {}
