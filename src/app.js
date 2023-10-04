import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import category_suppliesRoutes from './routes/category_supplies.routes.js';
import suppliesRoutes from './routes/supplies.routes.js';
import category_productsRoutes from './routes/category_products.routes.js';
import product from './routes/product.routes.js';
import recipe from './routes/recipe.routes.js'

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(category_suppliesRoutes);
app.use(suppliesRoutes);
app.use(category_productsRoutes);
app.use(product);
app.use(recipe);

export default app;