import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialDto } from './user-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  async createUser(userCredentialDto:UserCredentialDto){
    const {username, password , name } = userCredentialDto
    const salt = bcrypt.genSaltSync()

    const user = new User()
    user.username = username
    user.name = name
    // user.salt = salt
    user.password = await this.hashPassword(password, salt)
    try{
      await user.save()
    }catch(error){
      if(error.code === '23505'){
        throw new ConflictException("this username already exist ")
      }else{
        throw new InternalServerErrorException()
      }
    }

    return user
}

  async verifyUserPassword(userCredentialDto: UserCredentialDto){
    const {username, password} = userCredentialDto
    const user = await this.findOne({username:username})
    if (user && await user.verifyPassword(password)){
      return user.username
    }else {
      return null
    }
  }

  async hashPassword(password:string , salt:string){
    return bcrypt.hash(password, salt)
  }
}
