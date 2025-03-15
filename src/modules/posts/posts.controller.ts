import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ROLE } from 'src/constants/enum';
import { Authentication } from 'src/decorator/middleware/authentication.decorator';
import { Authorization } from 'src/decorator/middleware/authorization.decorator';
import { User } from 'src/decorator/middleware/user.decorator';
import { getPaginationData } from 'src/helpers/getPagination';
import { successResponse } from 'src/helpers/successResponse.helper';
import { IJwtPayload } from '../jwt/jwt.interface';
import { CreatePostDTO, GetPostsDTO } from './dto/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')

export class PostsController {

    constructor(
        private readonly postsService: PostsService
    ) { }

    @Get()

    async get(@Query() query: GetPostsDTO) {
        const [data, total] = await this.postsService.getPosts({
            page: query.page ?? 1,
            perPage: query.perPage ?? 10,
            search: query.search
        });

        return successResponse('Posts fetched successfully', { data, pagination: getPaginationData(total, query.page, query.perPage) });
    }


    @Authentication()
    @Authorization([ROLE.USER])
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
