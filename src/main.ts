import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Increase payload size limit
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Configure CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Adjust with your frontend URL
    credentials: true, // Allow cookies and credentials to be sent cross-origin
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
