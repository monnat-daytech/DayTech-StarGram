import { EntityRepository, Repository } from 'typeorm';
import { CreateMyPostDto } from './create-mypost-dto';
import { MyPost } from './mypost.entity'

@EntityRepository(MyPost)
export class MyPostRepository extends Repository<MyPost> {
  async createMyPost(createMyPostDto: CreateMyPostDto) {
    const {content} = createMyPostDto;
    
    const myPost = new MyPost();
    myPost.content = content
    await myPost.save();
    return myPost;
  }
}
