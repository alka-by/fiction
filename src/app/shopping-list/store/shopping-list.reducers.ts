import { Ingridient } from "../../shared/ingridient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingridients: Ingridient[];
  editedIngridient: Ingridient;
  editedIngridientIndex: number;
}

const initialState: State = {
  ingridients: [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatos', 10)
  ],
  editedIngridient: null,
  editedIngridientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGRIDIENT: {
      return {
        ...state,
        ingridients: [...state.ingridients, action.payload]
      }
    }
    case ShoppingListActions.ADD_INGRIDIENTS: {
      return {
        ...state,
        ingridients: [...state.ingridients, ...action.payload]
      }
    }
    case ShoppingListActions.UPDATE_INGRIDIENT: {
      const ingridient = state.ingridients[state.editedIngridientIndex];
      const updatedIngridient = {
        ...ingridient,
        ...action.payload
      };
      const ingridientsToUpdate = [...state.ingridients];
      ingridientsToUpdate[state.editedIngridientIndex] = updatedIngridient;

      return {
        ...state,
        ingridients: ingridientsToUpdate,
        editedIngridient: null,
        editedIngridientIndex: -1
      };
    }
    case ShoppingListActions.DELETE_INGRIDIENT: {
      const ingridientsToDelete = [...state.ingridients];
      ingridientsToDelete.splice(state.editedIngridientIndex, 1);
      return {
        ...state,
        ingridients: ingridientsToDelete,
        editedIngridient: null,
        editedIngridientIndex: -1
      };
    }
    case ShoppingListActions.START_EDIT: {
      const editedIngridient = { ...state.ingridients[action.payload] };
      return {
        ...state,
        editedIngridient: editedIngridient,
        editedIngridientIndex: action.payload
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngridient: null,
        editedIngridientIndex: -1
      };
    }
    default:
      { return state; }
  }

}