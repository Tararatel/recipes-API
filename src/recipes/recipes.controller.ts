import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './entities/recipe.entity';

@Controller('api/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getRecipes(): Recipe[] {
    return this.recipesService.getRecipes();
  }

  @Get('/search')
  search(@Query('dish') dish: string) {
    return this.recipesService.search(dish);
  }

  @Get('/:id')
  getRecipe(@Param('id') recipeId: string): Recipe {
    return this.recipesService.getRecipe(Number(recipeId));
  }

  @Post()
  create(@Body() recipeData) {
    return this.recipesService.create(recipeData);
  }

  @Delete('/:id')
  remove(@Param('id') recipeId: string) {
    return this.recipesService.remove(Number(recipeId));
  }

  @Patch('/:id')
  update(@Param('id') recipeId: number, @Body() updateData: Partial<Recipe>) {
    return this.recipesService.update(recipeId, updateData);
  }
}
