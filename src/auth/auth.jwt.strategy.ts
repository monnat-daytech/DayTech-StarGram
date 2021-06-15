import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy , ExtractJwt} from 'passport-jwt'
import { UserRepository } from "./dto/user.repository";


export class AuthJwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(UserRepository) private userRepository:UserRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:"daytech1212312121"
        })
    }

    async validate(payload){
        const {username} = payload
        const user = await this.userRepository.findOne({username:username})

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
  
    }
}