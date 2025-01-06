import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: string) {
    await this.usersRepository.findById(id);
    return this.usersRepository;
  }


  async login(createUserDto: CreateUserDto): Promise<{ id:string, name: string,accessToken: string }> {
    const isValidUser = await this.usersRepository.validateUser(createUserDto);
    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { email: createUserDto.email };
    const accessToken = this.jwtService.sign(payload);
  
    // Desestructuramos el campo "name" de isValidUser
    const { id, name } = isValidUser;
  
    // Retornamos solo el campo "name" y el "accessToken"
    return { id, name, accessToken };
  }

}
