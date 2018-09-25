import { Recipe } from "../recipe.model";
import { Ingridient } from "../../shared/ingridient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State
}

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Burger',
      'My favorite dish',
      'https://www.nrn.com/sites/nrn.com/files/styles/article_featured_standard/public/sonic-mushroom-burger.gif?itok=epnLgURt',
      [
        new Ingridient('Bread', 1),
        new Ingridient('Cheese', 1),
        new Ingridient('Meat', 1)
      ]
    ),
    new Recipe(
      'Pasta',
      'His favorite dish',
      'https://www.tokyo-city.ru/goods/IMG_3942.jpg',
      [
        new Ingridient('Pasta', 1),
        new Ingridient('Cheese', 2),
        new Ingridient('Meat', 1)
      ]
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.payload]
      };
    }
    case RecipeActions.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    }
    case RecipeActions.UPDATE_RECIPE: {
      const recipe = state.recipes[action.payload.index];
      const updRecipe = {
        ...recipe,
        ...action.payload.newrecipe
      };
      const updRecipes = [...state.recipes];
      updRecipes[action.payload.index] = updRecipe;
      return {
        ...state,
        recipes: updRecipes
      };
    }
    case RecipeActions.DELETE_RECIPE: {
      const updRecipes = [...state.recipes];
      updRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: updRecipes
      };
    }
    default: {
      return state;
    }
  }

}