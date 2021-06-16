import { User } from 'src/auth/dto/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class MyPost extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({default : 7})
    userId: number;

    @Column()
    content: string;
  
    @Column({default : 'no image'})
    image: string;

    @ManyToOne(type => User, user => user.posts, { eager: false })
    user: User
  
    @UpdateDateColumn()
    update: Date;
  }
  