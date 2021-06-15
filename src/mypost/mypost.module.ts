import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyPostRepository } from './dto/mypost.repository';
import { MypostController } from './mypost.controller';
import { MypostService } from './mypost.service';

@Module({
  imports: [TypeOrmModule.forFeature([MyPostRepository])],
  controllers: [MypostController],
  providers: [MypostService]
})
export class MypostModule {}
