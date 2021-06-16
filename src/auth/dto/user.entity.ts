import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt'
import { type } from 'os';
import { MyPost } from 'src/mypost/dto/mypost.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({default: 'nammon'})
  name: string

  @Column()
  password: string;
 
  @OneToMany(type => MyPost, post => post.user , {eager : true})
  posts: MyPost
   
  // @Column({ default: 'no image ja' })
  // salt: string;

  async verifyPassword(password){
    const hashPassword = await bcrypt.hash(password, this.password)
    return this.password === hashPassword
  }
}
