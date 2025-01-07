import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());

  // Убедитесь, что swagger-ui-dist правильно указывает на нужную директорию
  const swaggerUiPath = require('swagger-ui-dist').getAbsoluteFSPath();
  app.useStaticAssets(swaggerUiPath, { prefix: '/swagger-ui/' }); // Отдаём статические файлы с префиксом /swagger-ui/

  const config = new DocumentBuilder()
    .setTitle('Recipe API')
    .setDescription('API для управления рецептами')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Теперь Swagger будет доступен через /swagger-ui/
  SwaggerModule.setup('swagger', app, document); // Изменяем Swagger URL на /swagger

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
