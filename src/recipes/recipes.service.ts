import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import cookbook from '../cookbook';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = Object.values(cookbook.dishes);

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: string): Recipe {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
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

  remove(id: string): void {
    this.getRecipe(id);
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
  }

  create(recipe: Recipe) {
    const newRecipe: Recipe = {
      id: this.recipes.length
        ? this.recipes[this.recipes.length - 1].id + 1
        : 1,
      ...recipe,
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  update(id: string, updateData: Partial<Recipe>): Recipe {
    const recipe = this.getRecipe(id);
    Object.assign(recipe, updateData);
    return recipe;
  }

  reset() {
    this.recipes = [...Object.values(cookbook.dishes)];
  }
}
