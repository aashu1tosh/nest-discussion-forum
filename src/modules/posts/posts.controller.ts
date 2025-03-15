import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator/middleware/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { successResponse } from 'src/helpers/successResponse.helper';
import { IJwtPayload } from '../jwt/jwt.interface';
import { CreatePostDTO } from './dto/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(
        private readonly postsService: PostsService
    ) { }

    @UseGuards(AuthGuard)
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
