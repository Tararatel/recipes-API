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
import { CreateRecipeDto, RecipeResponseDto, UpdateRecipeDto } from './dto/create-recipe.dto';
import {
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Recipes') // Группировка всех эндпоинтов под тегом "Recipes"
@Controller('api/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  /**
   * Получение списка всех рецептов
   */
  @Get()
  @ApiOperation({
    summary: 'Получить список всех рецептов',
    description: 'Возвращает полный список доступных рецептов из базы данных.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список всех рецептов успешно получен',
    type: [RecipeResponseDto],
  })
  getRecipes(): Recipe[] {
    return this.recipesService.getRecipes();
  }

  /**
   * Поиск рецептов по названию или категории
   */
  @Get('/search')
  @ApiOperation({
    summary: 'Поиск рецептов',
    description:
      'Выполняет поиск рецептов по названию блюда или категории. Поиск регистронезависимый.',
  })
  @ApiQuery({
    name: 'dish',
    type: String,
    description:
      'Название блюда или категории для поиска. Если совпадает с категорией, возвращаются все блюда из этой категории.',
    required: true,
    example: 'супы',
  })
  @ApiResponse({
    status: 200,
    description:
      'Список рецептов, соответствующих запросу. Если запрос совпадает с категорией, возвращаются все блюда из этой категории.',
    type: [RecipeResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Рецепты не найдены',
  })
  search(@Query('dish') dish: string): Recipe[] {
    return this.recipesService.search(dish);
  }

  /**
   * Получение рецепта по ID
   */
  @Get('/:id')
  @ApiOperation({
    summary: 'Получить рецепт по ID',
    description:
      'Возвращает информацию о конкретном рецепте по его уникальному ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Уникальный ID рецепта',
    type: String,
    required: true,
    example: 'guacamole',
  })
  @ApiResponse({
    status: 200,
    description: 'Информация о рецепте успешно получена',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Рецепт с указанным ID не найден',
  })
  getRecipe(@Param('id') recipeId: string): Recipe {
    return this.recipesService.getRecipe(recipeId);
  }

  /**
   * Создание нового рецепта
   */
  @Post()
  @ApiOperation({
    summary: 'Создать новый рецепт',
    description:
      'Добавляет новый рецепт в базу данных. Все поля обязательны, кроме `img` и `servings`.',
  })
  @ApiBody({
    description: 'Данные для создания нового рецепта',
    type: CreateRecipeDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Рецепт успешно создан',
    type: Recipe,
  })
  @ApiResponse({
    status: 400,
    description: 'Неверные данные запроса',
  })
  create(@Body() recipeData: CreateRecipeDto) {
    return this.recipesService.create(recipeData);
  }

  /**
   * Сброс данных к изначальному состоянию
   */
  @Post('reset')
  @ApiOperation({
    summary: 'Сбросить данные к изначальному состоянию',
    description:
      'Сбрасывает данные рецептов к изначальному состоянию (например, загружает данные из файла cookbook).',
  })
  @ApiResponse({
    status: 200,
    description: 'Данные успешно сброшены к изначальному состоянию',
  })
  reset() {
    this.recipesService.reset();
    return { message: 'Данные сброшены к изначальному состоянию' };
  }

  /**
   * Удаление рецепта по ID
   */
  @Delete('/:id')
  @ApiOperation({
    summary: 'Удалить рецепт по ID',
    description: 'Удаляет рецепт из базы данных по его уникальному ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Уникальный ID рецепта',
    type: String,
    required: true,
    example: 'guacamole', // Пример значения для параметра
  })
  @ApiResponse({
    status: 200,
    description: 'Рецепт успешно удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Рецепт с указанным ID не найден',
  })
  remove(@Param('id') recipeId: string) {
    return this.recipesService.remove(recipeId);
  }

  /**
   * Обновление рецепта по ID
   */
  @Patch('/:id')
  @ApiOperation({
    summary: 'Обновить рецепт по ID',
    description:
      'Обновляет данные существующего рецепта. Можно передавать только те поля, которые нужно изменить.',
  })
  @ApiParam({
    name: 'id',
    description: 'Уникальный ID рецепта',
    type: String,
    required: true,
    example: 'guacamole', // Пример значения для параметра
  })
  @ApiBody({
    description: 'Данные для обновления рецепта',
    type: UpdateRecipeDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Рецепт успешно обновлен',
    type: Recipe,
  })
  @ApiResponse({
    status: 400,
    description: 'Неверные данные запроса',
  })
  @ApiResponse({
    status: 404,
    description: 'Рецепт с указанным ID не найден',
  })
  update(@Param('id') recipeId: string, @Body() updateData: UpdateRecipeDto) {
    return this.recipesService.update(recipeId, updateData);
  }
}
