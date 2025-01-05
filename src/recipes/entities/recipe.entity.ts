export class Ingredient {
  name: string;
  quantity: string;
}

export class Recipe {
  id: string;
  category: string;
  title: string;
  difficulty: string;
  cookingTime: string;
  servings?: number;
  ingredients: Ingredient[];
  recipe: string[];
}

export class Category {
  id: string;
  name: string;
  description: string;
  dishes: string[];
}

export class Cookbook {
  categories: Category[];
  dishes: Record<string, Recipe>;
}
