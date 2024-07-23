import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import axios from 'axios';

const RecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    steps: '',
    description: '',
    image: 'https://via.placeholder.com/150', // Use a placeholder URL for testing
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/recipes', formData)
      .then((response) => {
        gsap.to('.recipe-form', {
          duration: 1,
          opacity: 0,
          y: 50,
          onComplete: () => navigate('/'),
        });
      })
      .catch((error) => {
        console.error('There was an error creating the recipe!', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <form
        className="recipe-form bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Create Recipe</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Ingredients (one per line):
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Steps (one per line):
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-4">
          Image URL:
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
