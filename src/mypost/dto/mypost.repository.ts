import { EntityRepository, Repository } from 'typeorm';
import { CreateMyPostDto } from './create-mypost-dto';
import { MyPost } from './mypost.entity'

@EntityRepository(MyPost)
export class MyPostRepository extends Repository<MyPost> {
  async createMyPost(createMyPostDto: CreateMyPostDto) {
    const {content , userId} = createMyPostDto;
    
    const myPost = new MyPost();
    myPost.userId = userId
    myPost.content = content
    await myPost.save();
    return myPost;
  }
}
