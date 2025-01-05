import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [RecipesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
