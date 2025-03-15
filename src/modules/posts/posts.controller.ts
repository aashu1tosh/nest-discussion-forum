import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { successResponse } from 'src/helpers/successResponse.helper';
import { CreatePostDTO } from './dto/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(
        private readonly postsService: PostsService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Body() data: CreatePostDTO) {
        await this.postsService.createPost(data, { id: '1' });
        return successResponse('Post created successfully');
    }

}
