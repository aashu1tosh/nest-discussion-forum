import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Authentication } from 'src/decorator/middleware/authentication.decorator';
import { User } from 'src/decorator/middleware/user.decorator';
import { successResponse } from 'src/helpers/successResponse.helper';
import { IJwtPayload } from '../jwt/jwt.interface';
import { CreatePostDTO } from './dto/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@Authentication()
export class PostsController {

    constructor(
        private readonly postsService: PostsService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(
        @Body() data: CreatePostDTO,
        @User() user?: IJwtPayload
    ) {
        await this.postsService.createPost(data, { id: user?.id as string });
        return successResponse('Post created successfully');
    }

}
