import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useStaticAssets(join(__dirname, 'public'));
  app.useStaticAssets(join(__dirname, 'images'), { prefix: '/images' });

  app.useGlobalPipes(new ValidationPipe());

  const swaggerUiPath = require('swagger-ui-dist').getAbsoluteFSPath();
  app.useStaticAssets(swaggerUiPath, {
    prefix: '/swagger-ui',
  });

  const config = new DocumentBuilder()
    .setTitle('Recipe API')
    .setDescription('API для управления рецептами')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'API | Книга рецептов',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
