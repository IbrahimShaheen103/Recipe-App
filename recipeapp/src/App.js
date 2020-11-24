import React, { useState, useEffect } from 'react';

import './App.css';
import Recipe from './comp/recipe';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setquery] = useState('chicken');

  const APP_KEY = '18f28491b324f655b8e770f736e52d10';
  const APP_ID = 'b166ccda';
  const exmp = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const res = await fetch(exmp);
    const data = await res.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setquery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form className='search-form' onSubmit={getSearch}>
        <input
          type='text'
          className='search-bar'
          value={search}
          onChange={updateSearch}
        />
        <button type='submit' className='search-btn'>Search</button>
      </form>
      <div className='recipe'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
