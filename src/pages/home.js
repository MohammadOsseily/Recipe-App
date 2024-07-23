import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import Search from '../components/Search';
import { fetchRecipes } from '../utils/api';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchRecipes().then((response) => setRecipes(response.data));
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Recipe App</h1>
      {!user && (
        <div className="mb-4">
          <p className="text-gray-700">
            Please register or login to start creating and saving your favorite
            recipes.
          </p>
        </div>
      )}
      <RecipeList
        recipes={searchResults.length > 0 ? searchResults : recipes}
      />
    </div>
  );
};

export default Home;
