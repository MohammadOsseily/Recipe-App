import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CreateRecipe from './pages/creatRecipe';
import Recipe from './pages/recipe';
import StarredRecipes from './pages/StarredRecipes';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleRegister = () => {
    setUser(JSON.parse(localStorage.getItem('user')));
  };

  const handleLogin = () => {
    setUser(JSON.parse(localStorage.getItem('user')));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/starred" element={<StarredRecipes />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
