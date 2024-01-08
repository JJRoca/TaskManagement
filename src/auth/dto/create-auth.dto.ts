import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The username for login',
    example: 'Admin',
  }) // Description for Swagger
  username: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString())
  @ApiProperty({
    type: String,
    description: 'The password for login',
    example: '@dmin123',
  }) // Description for Swagger
  password: string;
}
