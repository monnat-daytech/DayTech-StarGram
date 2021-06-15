import { EntityRepository, Repository } from 'typeorm';
import { CreateMyCommentDto } from './create-mycomment-dto'
import { MyComment } from './mycomment.entity'

@EntityRepository(MyComment)
export class MyCommentRepository extends Repository<MyComment> {
  async createMyComment(createMyCommentDto: CreateMyCommentDto) {
    const {content , postId} = createMyCommentDto;
  
    const myComment = new MyComment();
    myComment.postId = postId
    myComment.content = content
    await myComment.save();
    return myComment;
  }
}
