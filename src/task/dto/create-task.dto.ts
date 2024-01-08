import { IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Task 1',
  })
  @IsNotEmpty({})
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiProperty({
    description: 'The description of the task, this field is optional',
    example: 'This is the description of the task',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The status of the task to know if it is done or not',
    example: false,
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'The id of the user associated with the task',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  idUser: number;
}
