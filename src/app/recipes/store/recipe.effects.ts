import { Effect, Actions } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as RecipeActions from './recipe.actions';
import { Store } from "@ngrx/store";
import * as fromRecipe from './recipe.reducers';


@Injectable()
export class RecipeEffects {

  @Effect()
  recipeFetch = this.actions$.ofType(RecipeActions.FETCH_RECIPES).pipe(
    switchMap(
      (action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>(
          'https://ng-recipe-11a27.firebaseio.com/recipes.json',
          { observe: 'body', responseType: 'json' }
        )
      }), map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingridients']) {
              recipe['ingridients'] = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      )
  );

  @Effect({ dispatch: false })
  recipeSave = this.actions$.ofType(RecipeActions.SAVE_RECIPES).pipe(
    withLatestFrom(this.store.select('recipes')), switchMap(
      ([action, state]) => {
        const req = new HttpRequest(
          'PUT',
          'https://ng-recipe-11a27.firebaseio.com/recipes.json',
          state.recipes,
          { reportProgress: true });
        return this.httpClient.request(req);
      }
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) { }

}