import { Router } from "express";
import { getProducts, createProduct, getProductRecipe, updateProduct, toggleProductStatus } from '../controllers/product.controller.js';

const router = Router();

router.get('/product', getProducts)
router.get('/product_recipe/:id', getProductRecipe)
router.post('product-add', createProduct)
router.put('/product/:id', updateProduct)
router.put('/product/toggle/:id', toggleProductStatus)

export default router;