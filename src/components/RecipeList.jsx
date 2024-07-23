import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { fetchRecipes } from '../utils/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes().then((response) => {
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    });

    // GSAP animation for recipe list items
    gsap.from('.recipe-item', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, recipes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search recipes..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <Link to={`/recipe/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-teal-600">
                  {recipe.name}
                </h3>
                <p className="text-gray-700 mt-2">{recipe.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
