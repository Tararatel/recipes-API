import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class IngredientDto {
  @IsString()
  name: string;

  @IsString()
  quantity: string;
}

export class CreateRecipeDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly category: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly difficulty: string;

  @IsString()
  readonly cookingTime: string;

  @IsInt()
  @IsOptional()
  readonly servings?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  readonly ingredients: IngredientDto[];

  @IsArray()
  @IsString({ each: true })
  readonly recipe: string[];
}

export class UpdateRecipeDto {
  @IsString()
  @IsOptional()
  readonly category?: string;

  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly difficulty?: string;

  @IsString()
  @IsOptional()
  readonly cookingTime?: string;

  @IsInt()
  @IsOptional()
  readonly servings?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  @IsOptional()
  readonly ingredients?: IngredientDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly recipe?: string[];
}
