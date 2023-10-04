import { recipe } from '../models/recipe.model.js';

export const createRecipe = async (req, res) => {
    const { ID_INSUMOS, ID_PRODUCTO, Cantidad } = req.body;

    try {
        const newRecipe = await recipe.create({
            ID_INSUMOS,
            Cantidad,
            ID_PRODUCTO
        })
        res.json(newRecipe)
    } catch (error) {
        return res.state(500).json({ message: error.message })
    }
}

export const getRecipe = async (req, res) => {
    try {
        const recipes = await recipe.findAll()
        res.json(recipes)
    } catch (error) {
        return res.state(500).json({ message: error.message })
    }
}

export const getRecipeWProduct = async (req, res) => {
    try {
        const { id } = req.params
        const prodRec = await recipe.findAll({
            where: {
                ID_PRODUCTO: id
            }
        })
        res.json(prodRec)
    } catch (error) {
        return res.state(500).json({ message: error.message })
    }
}