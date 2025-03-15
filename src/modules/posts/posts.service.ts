import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreatePostDTO } from './dto/posts.dto';
import { Post } from './entity/posts.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postRepo: Repository<Post>,
        private authService: AuthService
    ) { }

    async getPosts({
        page,
        perPage,
        search
    }: { page: number, perPage: number, search?: string }): Promise<[Post[], number]> {

        const query = this.postRepo
            .createQueryBuilder('post')
            .select(['post.id', 'post.title', 'post.description', 'post.createdAt'])
            .leftJoin('post.auth', 'auth')
            .addSelect(['auth.id', 'auth.email']);

        if (search) {
            query
                .where('post.title LIKE :search', { search: `%${search}%` })
                .orWhere('post.description LIKE :search', { search: `%${search}%` })
                .orWhere('post.tags LIKE :search', { search: `%${search}%` })
        }

        return query
            .skip((page - 1) * perPage)
            .take(perPage)
            .orderBy('post.createdAt', 'DESC')
            .getManyAndCount();
    }



    async createPost(data: CreatePostDTO, { id }: { id: string }): Promise<void> {
        const post = new Post();
        post.title = data.title;
        post.description = data.description;
        post.tags = data.tags ?? [];
        post.auth = await this.authService.check(id);
        await this.postRepo.save(post)
        return;
    }

}
