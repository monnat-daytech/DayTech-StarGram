import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}


  @Get('/user/:id')
  getUserById(@Param('id') id : number){
  console.log("🚀 ~ file: auth.controller.ts ~ line 13 ~ AuthController ~ getUserById ~ id", id)
    
    return this.authenService.getUserById(id)
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  ddt(@Req() req){
    return req.user.username
  }

  // @Get('post/:id')
  // getUserPosts(@Param('id') id : number  ){
  //   return this.authenService.getUserPosts(id)

  // }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userCredential: UserCredentialDto) {
    console.log(
      '🚀 ~ file: auth.controller.ts ~ line 11 ~ AuthController ~ signup ~ userCredentialDto',
      userCredential,
    );
    return this.authenService.signUp(userCredential)
  }
  @Post('/signin')
  signIp(@Body() userCredential: UserCredentialDto) {
    console.log(
      '🚀 ~ file: auth.controller.ts ~ line 11 ~ AuthController ~ signup ~ userCredentialDto',
      userCredential,
    );
    return this.authenService.signIn(userCredential)
  }

}
