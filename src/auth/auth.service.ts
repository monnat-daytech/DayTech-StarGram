import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './dto/user.entity';
import { UserRepository } from './dto/user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) 
    private userRepository:UserRepository,
    private jwtService:JwtService
    ){

    }

     signUp(userCredentialDto:UserCredentialDto){
        // const {username, password} = userCredentialDto

        // const user = new User()
        // user.username = username
        // user.password = password
        // await user.save()
        // return user

        return this.userRepository.createUser(userCredentialDto)
    }

    async signIn(userCredentialDto: UserCredentialDto){
        const username =  await this.userRepository.verifyUserPassword(userCredentialDto)
        if(!username){
            throw new UnauthorizedException("Invalid Username or Password")
        }
        const payload = {username:username}
        const token = await this.jwtService.sign(payload)
        return {token}
    }
}
