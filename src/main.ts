import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Recipe API')
    .setDescription('API для управления рецептами')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customCssUrl: '/swagger-ui.css',
    customJs: '/swagger-ui-bundle.js',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
