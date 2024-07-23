import React, { useState } from 'react';
import { searchRecipes } from '../utils/api';

const Search = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      searchRecipes(query)
        .then((response) => {
          onSearchResults(response.data);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      onSearchResults([]); // Clear results if query is empty
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="mt-2 w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
