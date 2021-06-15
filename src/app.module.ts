import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MypostModule } from './mypost/mypost.module';
import { MycommentModule } from './mycomment/mycomment.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, MypostModule, MycommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
