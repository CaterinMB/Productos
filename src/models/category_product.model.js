import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { product } from './product.model.js';

export const category_product = sequelize.define('CATEGORIA_PRODUCTOS', {
    ID_CATEGORIA_PRODUCTOS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Categoria: {
        type: DataTypes.STRING,
        required: true
    },
    Imagen: {
        type: DataTypes.BLOB,
        required: true
    }
});

category_product.hasMany(product, {
    foreignKey: 'ID_CATEGORIA_PRODUCTOS',
    sourceKey: 'ID_CATEGORIA_PRODUCTOS'
})

product.belongsTo(category_product, {
    foreignKey: 'ID_CATEGORIA_PRODUCTOS',
    targetId: 'ID_CATEGORIA_PRODUCTOS'
})