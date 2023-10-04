import { Router } from "express";
import { createRecipe, getRecipe, getRecipeWProduct } from '../controllers/recipe.controller.js';

const router = Router();

router.get('/recipe', getRecipe)
router.get('/RecipeWProduct', getRecipeWProduct)
router.post('/recipe', createRecipe)

export default router