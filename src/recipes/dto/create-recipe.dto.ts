import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty({
    example: 'Картофель',
    description: 'Название ингредиента',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '4 шт',
    description: 'Количество ингредиента',
  })
  @IsString()
  quantity: string;
}

export class CreateRecipeDto {
  @ApiProperty({
    example: 'guacamole',
    description: 'Уникальный идентификатор рецепта (должен быть уникальным)',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    example: 'Салаты',
    description: 'Категория рецепта',
  })
  @IsString()
  readonly category: string;

  @ApiProperty({
    example: 'Гуакамоле',
    description: 'Название рецепта',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Лёгкая',
    description: 'Сложность приготовления рецепта',
  })
  @IsString()
  readonly difficulty: string;

  @ApiProperty({
    example: '15 минут',
    description: 'Время приготовления рецепта',
  })
  @IsString()
  readonly cookingTime: string;

  @ApiProperty({
    example: '/images/guacamole.webp',
    description: 'Ссылка на изображение рецепта (необязательное поле)',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly img?: string;

  @ApiProperty({
    example: 4,
    description: 'Количество порций (необязательное поле)',
    required: false,
  })
  @IsInt()
  @IsOptional()
  readonly servings?: number;

  @ApiProperty({
    type: [IngredientDto],
    description: 'Список ингредиентов',
    example: [
      { name: 'Авокадо', quantity: '3 шт' },
      { name: 'Помидор', quantity: '1 шт' },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  readonly ingredients: IngredientDto[];

  @ApiProperty({
    example: [
      'Шаг 1 - Разомните мякоть авокадо вилкой в пюре.',
      'Шаг 2 - Очистите помидор от кожуры и нарежьте мелкими кубиками.',
    ],
    description: 'Шаги приготовления рецепта',
  })
  @IsArray()
  @IsString({ each: true })
  readonly recipe: string[];
}

export class IngredientResponseDto {
  @ApiProperty({
    example: 'Авокадо',
    description: 'Название ингредиента',
  })
  name: string;

  @ApiProperty({
    example: '3 шт',
    description: 'Количество ингредиента',
  })
  quantity: string;
}

export class RecipeResponseDto {
  @ApiProperty({
    example: 'guacamole',
    description: 'Уникальный идентификатор рецепта',
  })
  id: string;

  @ApiProperty({
    example: 'Салаты',
    description: 'Категория рецепта',
  })
  category: string;

  @ApiProperty({
    example: 'Гуакамоле',
    description: 'Название рецепта',
  })
  title: string;

  @ApiProperty({
    example: 'Лёгкая',
    description: 'Сложность приготовления рецепта',
  })
  difficulty: string;

  @ApiProperty({
    example: '15 минут',
    description: 'Время приготовления рецепта',
  })
  cookingTime: string;

  @ApiProperty({
    example: '/images/guacamole.webp',
    description: 'Ссылка на изображение рецепта',
    required: false,
  })
  img?: string;

  @ApiProperty({
    example: 4,
    description: 'Количество порций',
    required: false,
  })
  servings?: number;

  @ApiProperty({
    type: [IngredientResponseDto],
    description: 'Список ингредиентов',
    example: [
      { name: 'Авокадо', quantity: '3 шт' },
      { name: 'Помидор', quantity: '1 шт' },
    ],
  })
  ingredients: IngredientResponseDto[];

  @ApiProperty({
    example: [
      'Шаг 1 - Разомните мякоть авокадо вилкой в пюре.',
      'Шаг 2 - Очистите помидор от кожуры и нарежьте мелкими кубиками.',
    ],
    description: 'Шаги приготовления рецепта',
  })
  recipe: string[];
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
