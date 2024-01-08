import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Task Management for users API')
    // eslint-disable-next-line prettier/prettier
    .setDescription('This is a task manager where a person assigns tasks to users')
    .setVersion('1.0')
    .addTag('Task')
    .addBearerAuth() // Add the Bearer token authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(); // permit all origins
  app.useGlobalPipes(new ValidationPipe()); // use validation pipe

  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
