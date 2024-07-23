import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaStar,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="bg-teal-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-lg font-semibold flex items-center"
        >
          <FaHome className="mr-2" /> Recipe App
        </Link>
        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-white hover:text-gray-200 flex items-center"
          >
            <FaHome className="mr-1" /> Home
          </Link>
          <Link
            to="/create"
            className="text-white hover:text-gray-200 flex items-center"
          >
            <FaPlus className="mr-1" /> Create Recipe
          </Link>
          <Link
            to="/starred"
            className="text-white hover:text-gray-200 flex items-center"
          >
            <FaStar className="mr-1" /> Starred Recipes
          </Link>
          {!user && (
            <>
              <Link
                to="/register"
                className="text-white hover:text-gray-200 flex items-center"
              >
                <FaUser className="mr-1" /> Register
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-gray-200 flex items-center"
              >
                <FaSignInAlt className="mr-1" /> Login
              </Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200 flex items-center"
            >
              <FaSignOutAlt className="mr-1" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
