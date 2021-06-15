import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';
import { GetUsername } from './get-username.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Get('/:id')
  getUserById(@Param('id') id : number){
    return this.authenService.getUserById(id)
  }

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

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req , @GetUsername() username){
    console.log("🚀 ~ file: auth.controller.ts ~ line 31 ~ AuthController ~ test ~ req", req)

    //TODO: return req.user.username
    return username
  }
}
