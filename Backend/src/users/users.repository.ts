import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { use } from 'passport';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(userId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async validateUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    try{
      const userExists = await this.userRepo.findOne({
        where: { email, password },
      });
      if (!userExists) {
        throw new Error('Invalid credentials');
      }
      return userExists;
    }catch(error){
      console.log(error);
      throw new Error('Something went wrong');
    }
  }
  
}
