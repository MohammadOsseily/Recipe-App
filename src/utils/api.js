import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ensure this matches your backend server URL
});

// Fetch recipes
export const fetchRecipes = () => api.get('/recipes');

// Fetch a single recipe
export const fetchRecipe = (id) => api.get(`/recipes/${id}`);

// Create a new recipe
export const createRecipe = (recipe) => api.post('/recipes', recipe);

// Add a comment
export const addComment = (recipeId, comment) =>
  api.post('/comments', { recipe_id: recipeId, text: comment.text });

// Add a star
export const addStar = (recipeId) =>
  api.post('/stars', { recipe_id: recipeId });

// Remove a star
export const removeStar = (recipeId) => api.delete(`/stars/${recipeId}`);

// Fetch starred recipes
export const fetchStarredRecipes = () => api.get('/stars');
export const searchRecipes = (query) =>
  api.get('/recipes/search', { params: { query } }); // Added search API call

export default {
  fetchRecipes,
  fetchRecipe,
  createRecipe,
  addComment,
  addStar,
  removeStar,
  fetchStarredRecipes,
  searchRecipes,
};
