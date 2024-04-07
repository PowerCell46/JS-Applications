import * as httpService from './http.js';
import { urlEndpoints } from '../utils/constants.js';


export const getAllRecipes = () => httpService.get(urlEndpoints.recipes);

export const getSearchedRecipes = (searchedValue) => httpService.get(`${urlEndpoints.recipes}?where=name%20LIKE%20%22${searchedValue}%22`);
