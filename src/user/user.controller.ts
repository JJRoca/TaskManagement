import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/decorator';

@ApiTags('user') // add the tag user to the swagger documentation
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @Roles('TaskAssigner') // just the TaskAssigner can create a user
  @UseGuards(AuthGuard, RolesGuard) // use the AuthGuard and the RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Create a user',
    description: 'Only users with the "TaskAssigner" role can create users.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'You do not have permission, Access Denied',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('TaskAssigner') // just the TaskAssigner can get all users
  @UseGuards(AuthGuard, RolesGuard) // use the AuthGuard and the RolesGuard
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Only users with the "TaskAssigner" role can get all users.',
  })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({
    status: 403,
    description: 'You do not have permission, Access Denied',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  @Roles('TaskAssigner') // just the TaskAssigner can update a user
  @UseGuards(AuthGuard, RolesGuard) // use the AuthGuard and the RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Update a user',
    description: 'Only users with the "TaskAssigner"',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'The id of the user to update. Enter the ID of the created user.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'You do not have permission.' })
  update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    return this.userService.update(id, createUserDto);
  }

  @Delete(':id')
  @Roles('TaskAssigner') // just the TaskAssigner can delete a user
  @UseGuards(AuthGuard, RolesGuard) // use the AuthGuard and the RolesGuard
  @ApiExcludeEndpoint()
  remove(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
