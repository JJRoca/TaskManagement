import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  // JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  due_date: Date = new Date();
  // @CreateDateColumn({ type: 'timestamp', name: 'due_date' })
  // dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
  // @JoinColumn({ name: 'user_id' })

  // @Column()
  // userId: number;
}
