import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports:[SequelizeModule.forFeature([])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
