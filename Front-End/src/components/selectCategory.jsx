import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectCategory = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const GetCategory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/category_products');  
        setOptions(response.data.Nombre_Categoria);
      } catch (error) {
        console.error('Error fetching options from the database:', error);
      }
    };

    GetCategory();
  }, []);

  return (
    <div>
      <label htmlFor="options">Seleccionar categoria:</label>
      <select id="options">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;