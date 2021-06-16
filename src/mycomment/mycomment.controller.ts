import { Body, Controller, Get, Post, Query, Param , Delete, Patch, Put} from '@nestjs/common';
import { CreateMyCommentDto } from './dto/create-mycomment-dto';
import { MycommentService } from './mycomment.service';

@Controller('mycomment')
export class MycommentController {
    constructor(private myCommentService: MycommentService){}

    // @Get()
    // getMyComments(@Query('keyword') keyword: number){
    //     return this.myCommentService.getMyComments(keyword)
    // }

    @Get('/:id')
    getMyCommentById(@Param('id') id: number){
        return this.myCommentService.getMyCommentById(id)
    }

    @Get('/:postId/:test')
    getMyCommentByPostId(@Param('postId') postId: number)
    {
    return this.myCommentService.getMyCommentByPostId(postId);
    }

    @Post()
    addMyComment(@Body() createMyCommentDto:CreateMyCommentDto){
        return this.myCommentService.createMyComment(createMyCommentDto)
    }

    @Delete('/:id')
    deleteMyCommentById(@Param('id') id: number) {
      return this.myCommentService.deleteMyCommentById(id);
    }

    @Patch('/:id/test')
     async upDateMyCommentById(@Param('id') id: number,@Body() createMyCommentDto: CreateMyCommentDto,){
        return  await this.myCommentService.upDateMyCommentById(id , createMyCommentDto )
    }

}
