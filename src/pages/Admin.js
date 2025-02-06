
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({ name: '', ingredients: '', price: '', image: null });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/meals');
      setMeals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('ingredients', formData.ingredients);
    formDataObj.append('price', formData.price);
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      await axios.post('http://localhost:5000/api/meals', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchMeals();
      setFormData({ name: '', ingredients: '', price: '', image: null });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/meals/${id}`);
      fetchMeals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-content" style={{ padding: '20px' }}>
      <h1>Admin Panel</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Meal Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="ingredients" placeholder="Ingredients (comma-separated)" value={formData.ingredients} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Add Meal</button>
      </form>

      <h2>Existing Meals</h2>
      {meals.map((meal) => (
        <div key={meal._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
          <img src={`http://localhost:5000${meal.image}`} alt={meal.name} width="300" />
          <h3>{meal.name}</h3>
          <p>Ingredients: {meal.ingredients.join(', ')}</p>
          <p>Price: ${meal.price}</p>
          <button onClick={() => handleDelete(meal._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;