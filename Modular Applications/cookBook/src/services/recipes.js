import * as httpService from './http.js';
import { urlEndpoints } from '../utils/constants.js';


export const getAllRecipes = () => httpService.get(urlEndpoints.recipes);


export const getSearchedRecipes = (searchedValue) => httpService.get(`${urlEndpoints.recipes}?where=name%20LIKE%20%22${searchedValue}%22`);


export const postRecipe = (body) => httpService.post(urlEndpoints.recipes, body); 


export const getRecipeDetails = (recipeId) => httpService.get(`${urlEndpoints.recipes}/${recipeId}`);