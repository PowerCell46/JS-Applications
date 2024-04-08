import * as httpService from './http.js';
import { urlEndpoints } from '../utils/constants.js';


export const getAllRecipes = () => httpService.get(urlEndpoints.recipes);


export const getSearchedRecipes = (searchedValue) => httpService.get(`${urlEndpoints.recipes}?where=name%20LIKE%20%22${searchedValue}%22`);


export const postRecipe = (body) => httpService.post(urlEndpoints.recipes, body); 


export const getRecipeDetails = (recipeId) => httpService.get(`${urlEndpoints.recipes}/${recipeId}`);


export const putRecipe = (recipeId, body) => httpService.put(`${urlEndpoints.recipes}/${recipeId}`, body);


export const getRecipeComments = (recipeId) => httpService.get(`${urlEndpoints.comments}?where=recipeId%3D%22${recipeId}%22`);


export const postRecipeComment = (body) => httpService.post(urlEndpoints.comments, body);


export const delRecipe = (recipeId) => httpService.del(`${urlEndpoints.recipes}/${recipeId}`);

