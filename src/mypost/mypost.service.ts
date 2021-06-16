import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMyPostDto } from './dto/create-mypost-dto';
import { MyPostRepository } from './dto/mypost.repository';
import * as fsExtra from 'fs-extra';

@Injectable()
export class MypostService {
    constructor(
        @InjectRepository(MyPostRepository) 
        private myPostRepository:MyPostRepository
    ){}

    createMyPost(createMyPostDto: CreateMyPostDto){

        return this.myPostRepository.createMyPost(createMyPostDto)

    }

    getMyPosts(){
      return this.myPostRepository.find()
    }
 
    async getMyPostById(id: number) {
        const data = await this.myPostRepository.findOne(id);
        if (!data) {
          throw new NotFoundException(`Product ${id} not found`);
        }
    
        return data;
      }
      
      async upDateMyPost(id: number, createMyPostDto: CreateMyPostDto) {
        const myPost = await this.getMyPostById(id);
        const {content} = createMyPostDto
        myPost.content = content
        await myPost.save();
        return myPost;
      }

      async deleteMyPost(id: number){
        const data = await this.getMyPostById(id);
        const { image } = data;
        await fsExtra.remove(`upload/${image}`);
        return await this.myPostRepository.delete(id);
      }

}
