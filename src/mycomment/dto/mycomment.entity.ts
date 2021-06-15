import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class MyComment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postId: number;
  
    @Column()
    content: string;
    
    @UpdateDateColumn()
    update: Date;
  }
  