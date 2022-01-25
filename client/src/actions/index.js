import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAILS, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE, GET_DIET_TYPES, LOCAL_HOST } from './types';

export function getRecipes() {
    return function(dispatch) {
        axios.get(`${LOCAL_HOST}/api/recipes`)   
    .then((response) => {
        return dispatch({type: GET_RECIPES, payload: response.data})
    }).catch((error) => {
        console.log(error)
    }
    )
}};

export function getRecipesByName(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/api/recipes?name=${payload}`);
            return dispatch({type: SEARCH_RECIPE, payload: response.data})
        } catch {
            return alert ('Recipe Not Found')
        }
    }
}

export function getDietTypes() {
    return async function(dispatch) {
        try{
            var response = await axios.get(`${LOCAL_HOST}/api/types`);
            return dispatch({type: GET_DIET_TYPES, payload: response.data.map(d => d.name)});
        } catch (error) {
            console.log(error)
        }
    }
}

export function addRecipe(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.post(`${LOCAL_HOST}/api/recipe`, payload);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}
export function getRecipeDetails(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/api/recipes/${payload}`);
            return dispatch({type: GET_RECIPE_DETAILS, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function dietTypeFilter(payload) {
    return {
        type: DIET_TYPE_FILTER,
        payload
    }
};

export function aplhabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload
    }
};

export function scoreSort(payload) {
    return {
        type: SCORE_SORT,
        payload
    }
}