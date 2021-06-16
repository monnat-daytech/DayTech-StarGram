import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MyPostRepository } from './dto/mypost.repository';
import { MypostController } from './mypost.controller';
import { MypostService } from './mypost.service';

@Module({
  imports: [TypeOrmModule.forFeature([MyPostRepository]), AuthModule],
  controllers: [MypostController],
  providers: [MypostService]
})
export class MypostModule {}
