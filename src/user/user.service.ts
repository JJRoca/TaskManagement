import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // check if there is a user with the same email or username
      const existingUser = await this._userRepository.findOne({
        where: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      });
      // if existingUser is not null, then there is a user with the same email or username
      if (existingUser) {
        // if existingUser.email === createUserDto.email, then the email already exists
        if (existingUser.email === createUserDto.email) {
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }
        // if existingUser.username === createUserDto.username, then the username already exists
        if (existingUser.username === createUserDto.username) {
          // eslint-disable-next-line prettier/prettier
          throw new HttpException('Username already exists', HttpStatus.CONFLICT);
        }
      }
      // create a new user
      const newUser = this._userRepository.create(createUserDto);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      return this._userRepository.save(newUser);
    } catch (error) {
      // if error is an instance of HttpException, then it was thrown intentionally
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this._userRepository.find({
      select: ['id', 'name', 'username', 'email'],
    });
  }

  // eslint-disable-next-line prettier/prettier
  async update(id: number, createUserDto: CreateUserDto): Promise<UpdateResult> {
    const user = await this._userRepository.update(id, createUserDto);
    if (user.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async delete(id: number) {
    const user = await this._userRepository.findOne({
      where: { id: id },
      relations: ['tasks'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this._userRepository.remove(user);
  }
  async findByUsername(username: string): Promise<User | undefined> {
    return await this._userRepository.findOne({ where: { username } });
  }
}
