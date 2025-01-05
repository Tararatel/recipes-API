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
import { CreateRecipeDto, UpdateRecipeDto } from './dto/create-recipe.dto';

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
    return this.recipesService.getRecipe(recipeId);
  }

  @Post()
  create(@Body() recipeData: CreateRecipeDto) {
    return this.recipesService.create(recipeData);
  }

  @Post('reset')
  reset() {
    this.recipesService.reset();
    return { message: 'Данные сброшены к изначальному состоянию' };
  }

  @Delete('/:id')
  remove(@Param('id') recipeId: string) {
    return this.recipesService.remove(recipeId);
  }

  @Patch('/:id')
  update(@Param('id') recipeId: string, @Body() updateData: UpdateRecipeDto) {
    return this.recipesService.update(recipeId, updateData);
  }
}
