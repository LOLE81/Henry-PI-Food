import { GET_RECIPES, ADD_RECIPE } from '../actions/types'

const initialState = {
    recipes: [],
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
       case GET_RECIPES:
        return {
          ...state,
          recipes: action.payload,
        };
    //   case GET_CHARACTEER_DETAIL:
    //     return {
    //       ...state,
    //       charcaterDetail: action.payload,
    //     };
    //   case ADD_CHARACTER:
    //     return {
    //       ...state,
    //       charcaterCreate: [...state.charcaterCreate, action.payload],
    //     };
    //   case ADD_CHARACTERR_FAV:
    //     return {
    //       ...state,
    //       charcaterFav: [...state.charcaterFav, action.payload],
    //     };
    //   case REMOVE_CHARACTER_FAV:
    //       return {
    //           ...state,
    //           charcaterFav: state.charcaterFav.filter((fav) => fav.id !== action.payload)
    //       }
        default:
          return state;
    }
  }