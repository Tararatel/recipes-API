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
    example: 'Улитки по бургундски',
    description: 'Уникальный идентификатор рецепта',
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
    example: 'Оливье',
    description: 'Название рецепта',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Средняя',
    description: 'Сложность приготовления рецепта',
  })
  @IsString()
  readonly difficulty: string;

  @ApiProperty({
    example: '40 минут',
    description: 'Время приготовления рецепта',
  })
  @IsString()
  readonly cookingTime: string;

  @ApiProperty({
    example: 'https://example.com/images/img.webp',
    description: 'Ссылка на картинку',
  })
  @IsString()
  readonly img?: string;

  @ApiProperty({
    example: 6,
    description: 'Количество порций',
    required: false,
  })
  @IsInt()
  @IsOptional()
  readonly servings?: number;

  @ApiProperty({
    type: [IngredientDto],
    description: 'Список ингредиентов',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  readonly ingredients: IngredientDto[];

  @ApiProperty({
    example: ['Шаг 1: Нарезать картофель', 'Шаг 2: Смешать ингредиенты'],
    description: 'Шаги приготовления рецепта',
  })
  @IsArray()
  @IsString({ each: true })
  readonly recipe: string[];
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
