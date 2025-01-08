import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    RecipesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
      serveRoot: '/swagger-ui', // Здесь указываем корневой маршрут для статических файлов
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
