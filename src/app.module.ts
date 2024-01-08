import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      url: 'postgres://root:h30MkVot5Esxe4jM1F8KzQdOMzsUd3mh@dpg-cmcr7gv109ks7392nnsg-a.oregon-postgres.render.com/task_hqa4',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      autoLoadEntities: true,
      synchronize: true, // Auto create table
    }),
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
