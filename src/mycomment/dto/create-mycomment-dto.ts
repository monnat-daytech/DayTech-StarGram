import { IsNotEmpty } from 'class-validator';

export class CreateMyCommentDto{

    postId: number;

    content: string;
}
