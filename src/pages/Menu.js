
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/meals')
      .then(response => setMeals(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="page-content">
      <h1> welcome to the Menu page</h1>
      {meals.map(meal => (
        <div key={meal._id}>
          <img src={`http://localhost:5000${meal.image}`} alt={meal.name} width="200" />
          <h2>{meal.name}</h2>
          <p>Ingredients: {meal.ingredients.join(', ')}</p>
          <p>Price: ${meal.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Menu;