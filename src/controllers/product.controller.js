import { product } from '../models/product.model.js';
import { recipe } from '../models/recipe.model.js';

//Mostrar todos los productos
export const getProducts = async (req, res) =>  {
    try {
        const products = await product.findAll()
        res.json(products)
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

//Crear un producto
export const createProduct = async (req, res) => {
    const { } = req.body;

    try {
        const newProduct = await product.create({})

        res.json(newProduct)
    } catch (error) {
        return res.status(500).json({ message : error.message})
    }
}