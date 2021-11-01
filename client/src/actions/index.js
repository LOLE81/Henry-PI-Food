import axios from 'axios';
import { GET_RECIPES, ADD_RECIPE, GET_RECIPE_DETAILS } from './types';
const { LOCAL_HOST } = process.env;

export function getRecipes() {
    return async function(dispatch) {
        var response = await axios.get('http://localhost:3001/api/recipes');
        return dispatch({type: GET_RECIPES, payload: response.data})
    }
};

export function getRecipeDetails() {
    return async function(dispatch) {
        var response = await axios.get(`${LOCAL_HOST}api/recipes?name=`);
        return dispatch({type: GET_RECIPE_DETAILS, payload: response.data})
    }
};