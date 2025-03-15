import Base from 'src/helpers/base.entity';
import { Auth } from 'src/modules/auth/entity/auth.entity';
import { Post } from 'src/modules/posts/entity/posts.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity('comment')
export class Comment extends Base {
    @Column()
    comment: string;

    @ManyToOne(() => Auth, (auth) => auth.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'auth_id' })
    auth: Auth;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
    parent: Comment;

    @OneToMany(() => Comment, (comment) => comment.parent, { nullable: true })
    children: Comment[];
}
