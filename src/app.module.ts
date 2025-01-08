import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    RecipesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Указываем путь к папке public
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
