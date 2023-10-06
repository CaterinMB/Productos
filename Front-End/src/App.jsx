import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import { Product } from '';
import { Recipe } from '';
import { ProductRecipeForm } from '';
import { RecipeForm } from '';

function App() {
  return (
          <BrowserRouter>
          <div className="flex">
              <Navbar />
              <main className='container mx-auto px-10 flex-grow'>
                <Routes>
                  <Route path='/' element={<h1>Home</h1>} />
                  <Route path='/product' element={<Product />} />
                  <Route path='/recipes/:id' element={<Recipe />} />
                  <Route path='/productrecipeform' element={<ProductRecipeForm />} />
                  <Route path='/recipeform/:id' element={<RecipeForm />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
  )
}

export default App