import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { addStar, removeStar, fetchStarredRecipes } from '../utils/api';

const Stars = ({ recipeId }) => {
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    fetchStarredRecipes().then((response) => {
      const starred = response.data.some(
        (recipe) => recipe.id === parseInt(recipeId)
      );
      setIsStarred(starred);
    });
  }, [recipeId]);

  const handleStarClick = () => {
    if (isStarred) {
      removeStar(recipeId).then(() => {
        setIsStarred(false);
        Swal.fire({
          icon: 'success',
          title: 'Removed from Favorites',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      addStar(recipeId).then(() => {
        setIsStarred(true);
        Swal.fire({
          icon: 'success',
          title: 'Added to Favorites',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleStarClick}
        className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
      >
        {isStarred ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default Stars;
