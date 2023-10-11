import { Router } from "express";
import { createRecipe, getRecipe, getRecipeWProduct, updateRecipeAdd, updateRecipesubstract } from '../controllers/recipe.controller.js';

const router = Router();

router.get('/recipe', getRecipe)
router.get('/RecipeWProduct/:id', getRecipeWProduct)
router.post('/recipe', createRecipe)

router.put('/updateRecipe_add/:id', updateRecipeAdd)
router.put('/updateRecipe_subtract/:id', updateRecipesubstract)

export default router