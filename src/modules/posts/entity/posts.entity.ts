import Base from 'src/helpers/base.entity';
import { Auth } from 'src/modules/auth/entity/auth.entity';
import { Comment } from 'src/modules/comment/entity/comment.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity('posts')
export class Post extends Base {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column('text', { array: true, nullable: true })
    tags: string[];

    @ManyToOne(() => Auth, (auth) => auth.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'auth_id' })
    auth: Auth;

    @OneToMany(() => Comment, (comment) => comment.post, {
        onDelete: 'CASCADE',
    })
    comments: Comment[];
}
