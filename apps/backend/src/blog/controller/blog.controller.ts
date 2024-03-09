import { Controller } from '@nestjs/common';
import { BlogService } from '../service/blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
}
