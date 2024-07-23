import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="bg-teal-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Recipe App
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/create" className="text-white hover:text-gray-200">
            Create Recipe
          </Link>
          <Link to="/starred" className="text-white hover:text-gray-200">
            Starred Recipes
          </Link>
          {!user && (
            <>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
