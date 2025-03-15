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
