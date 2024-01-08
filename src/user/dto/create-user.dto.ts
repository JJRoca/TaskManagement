import { Transform } from 'class-transformer';
import { UserRole } from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Maria',
  })
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'Age of the user , this field is optional',
    example: 25,
  })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Email of the user',
    example: 'Mary@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'Mary',
  })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({ description: 'Password of the user', example: 'M@ry1234' })
  password: string;

  @ApiProperty({
    enum: ['TaskViewer', 'TaskAssigner'],
    description:
      'Role of the user, exists two roles: TaskAssigner and TaskViewer',
  })
  @IsEnum(UserRole, { message: 'Role is invalid' })
  @IsNotEmpty({ message: 'Role is required' })
  role: UserRole;
}
