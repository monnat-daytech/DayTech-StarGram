import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
// import { MyPostRepository } from 'src/mypost/dto/mypost.repository';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './dto/user.entity';
import { UserRepository } from './dto/user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository)
    private userRepository:UserRepository,
    private jwtService:JwtService,

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

    async getUserById(id : number){
        const data = await this.userRepository.findOne(id);
        if (!data) {
          throw new NotFoundException(`Product ${id} not found`);
        }
        return data;
    }

    async getUserPosts(id : number){
            const data = await this.userRepository.find({where : {id}})  
            console.log("🚀 ~ file: auth.service.ts ~ line 50 ~ AuthService ~ getUserPosts ~ data", data)
            console.log(data[0].posts)
            return data

     }
}
