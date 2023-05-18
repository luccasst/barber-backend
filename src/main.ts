<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';
=======
>>>>>>> ef2e31a794f74d2aaf4b6e2da59b55a583b07c52
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ),
    app.enableCors();
  await app.listen(3012);
=======
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
>>>>>>> ef2e31a794f74d2aaf4b6e2da59b55a583b07c52
}
bootstrap();
