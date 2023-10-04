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
    const { Nombre_Producto, Precio, ID_CATEGORIA_PRODUCTOS } = req.body;

    try {
        const newProduct = await product.create({
            Nombre_Producto,
            Precio,
            ID_CATEGORIA_PRODUCTOS
        })

        res.json(newProduct)
    } catch (error) {
        return res.status(500).json({ message : error.message})
    }
}

//Ver las recetas de un producto
export const getProductRecipe = async (req, res) => {
    const { id } = req.params
    try {
        const gets = await product.findByPk(
            id,
            {
                include : recipe
            }
        )
        res.json(gets)

    } catch (error) {
        return res.status(500).json({ message : error.message})
    }
}

//Actualiza informacion de productos
export const updateProduct = async (req, res) => {
    const { id } = req.params

    try {
        const { Nombre_Producto, Precio, ID_CATEGORIA_PRODUCTOS } = req.body

        const updateProduct = await user.findByPk(id)

        updateProduct.Nombre_Producto = Nombre_Producto
        updateProduct.Precio = Precio
        updateProduct.ID_CATEGORIA_PRODUCTOS = ID_CATEGORIA_PRODUCTOS

        await updateProduct.save();

        return res.json(updateProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Cambiar estado
export const toggleProductStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusPoduct = await user.findOne({
            where: { ID_PRODUCTO: id },
        });

        if (!statusPoduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        };

        statusPoduct.Estado = !statusPoduct.Estado;

        await statusPoduct.save();

        return res.json(statusPoduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};