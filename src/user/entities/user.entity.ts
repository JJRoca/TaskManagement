import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../task/entities/task.entity';

// enum is a special type that defines a set of named constants
export enum UserRole {
  TASK_ASSIGNER = 'TaskAssigner',
  TASK_VIEWER = 'TaskViewer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;
  @Column({
    type: 'enum', // Define the type as 'enum', which represents a set of named constants
    enum: UserRole, // Here we establish the set of constants using the variable UserRole
    default: UserRole.TASK_VIEWER, // Default value: UserRole.TASK_VIEWER
  })
  role: UserRole; // The 'role' variable represents the user's role based on the UserRole enumeration

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
