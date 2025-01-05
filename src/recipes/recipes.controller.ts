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
import {
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('api/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Список всех рецептов',
    type: [Recipe],
  })
  getRecipes(): Recipe[] {
    return this.recipesService.getRecipes();
  }

  @Get('/search')
  @ApiQuery({
    name: 'dish',
    type: String,
    description: 'Название блюда или категории для поиска',
  })
  @ApiResponse({
    status: 200,
    description: 'Результаты поиска рецептов',
    type: [Recipe],
  })
  search(@Query('dish') dish: string) {
    return this.recipesService.search(dish);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Уникальный ID рецепта', type: String })
  @ApiResponse({
    status: 200,
    description: 'Информация о рецепте',
    type: Recipe,
  })
  @ApiResponse({ status: 404, description: 'Рецепт не найден' })
  getRecipe(@Param('id') recipeId: string): Recipe {
    return this.recipesService.getRecipe(recipeId);
  }

  @Post()
  @ApiBody({
    description: 'Данные для создания рецепта',
    type: CreateRecipeDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Рецепт успешно создан',
    type: Recipe,
  })
  create(@Body() recipeData: CreateRecipeDto) {
    return this.recipesService.create(recipeData);
  }

  @Post('reset')
  @ApiResponse({
    status: 200,
    description: 'Данные сброшены к изначальному состоянию',
  })
  reset() {
    this.recipesService.reset();
    return { message: 'Данные сброшены к изначальному состоянию' };
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Уникальный ID рецепта', type: String })
  @ApiResponse({ status: 200, description: 'Рецепт успешно удален' })
  @ApiResponse({ status: 404, description: 'Рецепт не найден' })
  remove(@Param('id') recipeId: string) {
    return this.recipesService.remove(recipeId);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'Уникальный ID рецепта', type: String })
  @ApiBody({
    description: 'Данные для обновления рецепта',
    type: UpdateRecipeDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Рецепт успешно обновлен',
    type: Recipe,
  })
  @ApiResponse({ status: 404, description: 'Рецепт не найден' })
  update(@Param('id') recipeId: string, @Body() updateData: UpdateRecipeDto) {
    return this.recipesService.update(recipeId, updateData);
  }
}
