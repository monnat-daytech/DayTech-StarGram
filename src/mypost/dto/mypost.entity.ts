import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class MyPost extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @Column({default : 'no image'})
    image: string;
  
    @UpdateDateColumn()
    update: Date;
  }
  