import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

// Define the controller for the 'task' route
@ApiTags('task') // add the tag task to the swagger documentation
@Controller('task')
export class TaskController {
  // Inject the TaskService into the controller
  constructor(private readonly taskService: TaskService) {}

  // Define a POST endpoint for creating a task
  @Post('create')
  @Roles('TaskAssigner') // Only allow users with the 'TaskAssigner' role to access this endpoint
  @UseGuards(AuthGuard, RolesGuard) // Protect this endpoint with the AuthGuard and RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Create a task',
    description:
      'Only users with the "TaskAssigner" role can create tasks.Enter an existing ID.',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    // console.log(createTaskDto);
    return this.taskService.create(createTaskDto);
  }

  // Define a GET endpoint for retrieving all tasks
  @Get()
  @Roles('TaskAssigner') // Only allow users with the 'TaskAssigner' role to access this endpoint
  @UseGuards(AuthGuard, RolesGuard) // Protect this endpoint with the AuthGuard and RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Only users with the "TaskAssigner" role can get all tasks.',
  })
  findAll() {
    return this.taskService.findAll();
  }

  //Define a GET endpoint for retrieving all users
  @Get('user')
  @Roles('TaskAssigner') // Only allow users with the 'TaskAssigner' role to access this endpoint
  @UseGuards(AuthGuard, RolesGuard) // Protect this endpoint with the AuthGuard and RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Get all users',
    description: 'Only users with the "TaskAssigner" role can get all users.',
  })
  getUsers() {
    return this.taskService.getUsers();
  }

  @Get('tasksByUser')
  @Roles('TaskViewer')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all tasks by user',
    description: 'Only users with the "TaskViewer" role can get all tasks.',
  })
  @ApiResponse({ status: 200, description: 'Return all tasks by user.' })
  getTasksUser(@Req() req: any) {
    return this.taskService.getTasksByUser(req.user.username);
  }

  //Define a GET endpoint for retrieving a task by id
  @Get(':id')
  @Roles('TaskAssigner') // Only allow users with the 'TaskAssigner' role to access this endpoint
  @UseGuards(AuthGuard, RolesGuard) // Protect this endpoint with the AuthGuard and RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Get a task by id',
    description:
      'Only users with the "TaskAssigner" role can get a task by id.',
  })
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  // Define a DELETE endpoint for deleting a task by id
  @Delete('/delete/:id')
  @Roles('TaskAssigner') // Only allow users with the 'TaskAssigner' role to access this endpoint
  @UseGuards(AuthGuard, RolesGuard) // Protect this endpoint with the AuthGuard and RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Delete a task by id',
    description:
      'Only users with the "TaskAssigner" role can delete a task by id.',
  })
  @ApiParam({ name: 'id', description: 'Task id' })
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
  // Define a PUT endpoint for updating a task by id
  @Put('/update')
  @Roles('TaskAssigner') // Only allow users with the 'TaskAssigner' role to access this endpoint
  @UseGuards(AuthGuard, RolesGuard) // Protect this endpoint with the AuthGuard and RolesGuard
  @ApiBearerAuth() // Indicate to Swagger that this endpoint requires Bearer token authentication
  @ApiOperation({
    summary: 'Update a task by id',
    description:
      'Only users with the "TaskAssigner" role can update a task by id.',
  })
  updateTask(
    @Query('Taskid') Taskid: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.updateTask(Taskid, createTaskDto);
  }
}
