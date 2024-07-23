import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { fetchRecipe } from '../utils/api';
import Comments from './Comments';
import Stars from './Stars';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe(id).then((response) => setRecipe(response.data));

    // GSAP animation for recipe details
    gsap.from('.recipe-detail', {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power3.out',
    });
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Recipe URL copied to clipboard');
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateRecipeText(recipe)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${recipe.name}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const generateRecipeText = (recipe) => {
    return `
      Recipe: ${recipe.name}
      Ingredients:
      ${recipe.ingredients.split('\n').join('\n')}
      Steps:
      ${recipe.steps.split('\n').join('\n')}
    `;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="recipe-detail bg-white p-6 rounded-lg shadow-md">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150';
          }}
        />
        <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients.split('\n').map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Steps</h3>
        <ol className="list-decimal list-inside">
          {recipe.steps.split('\n').map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className="recipe-actions flex space-x-4 mt-6">
          <button
            onClick={handleShare}
            className="flex-1 bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Share URL
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Download Recipe
          </button>
        </div>
        <Comments recipeId={id} />
        <Stars recipeId={id} />
      </div>
    </div>
  );
};

export default RecipeDetail;
