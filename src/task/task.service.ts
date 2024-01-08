import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private _taskRepository: Repository<Task>,
    @InjectRepository(User) private _userRepository: Repository<User>,
    private _userService: UserService,
  ) {}
  // method getUsers to get all users
  async getUsers(): Promise<User[]> {
    // return all users
    return this._userService.findAll();
  }
  // method create to create a task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // console.log(createTaskDto);
    const user = await this._userRepository.findOne({
      where: { id: createTaskDto.idUser },
      select: ['id', 'name', 'username'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const newTask = this._taskRepository.create({
      ...createTaskDto,
      user,
    });
    // console.log("body",newTask);
    const savedTask = await this._taskRepository.save(newTask);
    return savedTask;
  }
  // method findAll to get all tasks
  async findAll() {
    // retrieve all tasks with users associated
    const tasksWithUsers = await this._taskRepository.find({
      relations: ['user'],
    });
    const tasksFormatted = tasksWithUsers.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      user: {
        name: task.user.name,
        username: task.user.username,
      }, //Add the user property
    }));
    return tasksFormatted;
  }
  // method getTask to get a task by id
  async getTask(id: string): Promise<any> {
    try {
      // Parse the incoming string ID to a number
      const idTask = parseInt(id);
      // Fetch the task with its associated user information
      const taskWithUser = await this._taskRepository.findOne({
        where: { id: idTask },
        relations: ['user'],
      });

      // If the task is not found, throw a 404 error
      if (!taskWithUser) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      // Prepare and return the task details with user information
      return {
        id: taskWithUser.id,
        title: taskWithUser.title,
        description: taskWithUser.description,
        status: taskWithUser.status,
        idUser: taskWithUser.user
          ? {
              id: taskWithUser.user.id,
              name: taskWithUser.user.name,
              email: taskWithUser.user.email,
            }
          : 'No user',
      };
    } catch (error) {
      // if error is an instance of HttpException, then it was thrown intentionally
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  // method deleteTask to delete a task by id
  async deleteTask(id: string): Promise<DeleteResult> {
    await this.getTask(id);
    return await this._taskRepository.delete(id);
  }

  //method put to update a task by id
  // eslint-disable-next-line prettier/prettier
  async updateTask(id: string, createTask: CreateTaskDto): Promise<UpdateResult> {
    // verify if the user exists in the database before updating the task
    const user = await this._userRepository.findOne({
      where: { id: createTask.idUser },
    });
    // if the task does not exist, thorw an error
    await this.getTask(id);
    // if user does not exist, throw an error
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    // update the task with the new information and save it
    return await this._taskRepository.update(id, {
      title: createTask.title,
      description: createTask.description,
      status: createTask.status,
      user: user,
    });
  }

  async getTasksByUser(username: string) {
    // console.log(username);
    const user = await this._userRepository.findOne({
      where: { username: username },
      relations: ['tasks'],
    });
    return user.tasks;
  }
}
