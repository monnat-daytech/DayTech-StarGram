import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMyCommentDto } from './dto/create-mycomment-dto';
import { MyCommentRepository } from './dto/mycomment.repository';

@Injectable()
export class MycommentService {

    constructor(
        @InjectRepository(MyCommentRepository)
        private myCommentRepository:MyCommentRepository
    ){}

    
    createMyComment(createMyCommentDto: CreateMyCommentDto){
        return this.myCommentRepository.createMyComment(createMyCommentDto)
    }

    getMyComments(keyword: number){
        if(keyword){
            const query = this.myCommentRepository.createQueryBuilder('mycomment');
            query.andWhere('mycomment.postId LIKE :keyword', { keyword: `%${keyword}%`});
            return query.getMany();
        }else{
            return this.myCommentRepository.find();
        }
    }

    async deleteMyCommentById(id : number){
        return await this.myCommentRepository.delete(id);
    }

    // async getMyCommentById(id: number){
    //     const data = await this.myCommentRepository.findOne(id);
    //     if (!data) {
    //         throw new NotFoundException(`Product ${id} not found`);
    //       }
      
    //       return data;
    // }

    async upDateMyCommentById(id: number, createMyCommentDto: CreateMyCommentDto){
        console.log("🚀 ~ file: mycomment.service.ts ~ line 46 ~ MycommentService ~ upDateMyCommentById ~ createMyCommentDto", createMyCommentDto)
        const myComment = await this.myCommentRepository.findOne(id);
        const {content} = createMyCommentDto
        console.log("🚀 ~ file: mycomment.service.ts ~ line 49 ~ MycommentService ~ upDateMyCommentById ~ content", content)
        myComment.content = content
        await myComment.save();
        console.log("🚀 ~ file: mycomment.service.ts ~ line 51 ~ MycommentService ~ upDateMyCommentById ~ myComment", myComment)
        return myComment;
    }

}
