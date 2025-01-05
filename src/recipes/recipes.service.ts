import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: number): Recipe {
    const recipe = this.recipes.find((recipe) => recipe.id === +id);
    if (!recipe) {
      throw new NotFoundException(`Рецепт с id ${id} не найден`);
    }
    return recipe;
  }

  search(dish: string): Recipe[] {
    return this.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(dish.toLowerCase()),
    );
  }

  remove(id: number): void {
    this.getRecipe(id);
    this.recipes = this.recipes.filter((recipe) => recipe.id !== +id);
  }

  create(recipe: Recipe) {
    const newRecipe: Recipe = {
      id: this.recipes.length
        ? this.recipes[this.recipes.length - 1].id + 1
        : 1,
      ...recipe,
    };
    this.recipes.push(newRecipe);
  }

  update(id: number, updateData: Partial<Recipe>): Recipe {
    const recipe = this.getRecipe(id);
    Object.assign(recipe, updateData);
    return recipe;
  }
}
