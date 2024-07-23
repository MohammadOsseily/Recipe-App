import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
      .post('http://localhost:8000/api/register', formData)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        Swal.fire({
          icon: 'success',
          title: 'Registered successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        onRegister();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed!',
          text:
            error.response.data.message ||
            'An error occurred. Please try again.',
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
