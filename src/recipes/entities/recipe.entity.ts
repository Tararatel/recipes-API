export class Recipe {
  id: number;
  category: string;
  title: string;
  difficulty: string;
  cookingTime: string;
  servings?: number;
  ingredients: Ingredient[];
  recipe: string[];
}

export class Ingredient {
  name: string;
  quantity: string;
}

export class Category {
  id: number;
  name: string;
  description: string;
  dishes: string[];
}

export class Cookbook {
  categories: Category[];
  dishes: Record<string, Recipe>;
}
