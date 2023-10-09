import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import ProductRecipeForm from './pages/productRecipeForm.jsx';
import ProductForm from './pages/productForm.jsx';
import Recipe from './pages/recipe.jsx';
import Product from './pages/product.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />
        <main className='container mx-auto px-10 flex-grow'>
          <Routes>
            <Route path='/' element={<h1>DASHBOARD</h1>} />
            <Route path='/product' element={<Product />} />
            <Route path='/recipes/:id' element={<Recipe />} />
            <Route path='/productform' element={<ProductForm />} />
            <Route path='/product_add/:id' element={<ProductRecipeForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App