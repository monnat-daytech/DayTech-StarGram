import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyCommentRepository } from './dto/mycomment.repository';
import { MycommentController } from './mycomment.controller';
import { MycommentService } from './mycomment.service';


@Module({
  imports: [TypeOrmModule.forFeature([MyCommentRepository])],
  controllers: [MycommentController],
  providers: [MycommentService]
})
export class MycommentModule {}
