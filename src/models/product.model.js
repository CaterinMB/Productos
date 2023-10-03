import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { recipe } from './recipe.model.js';
import { detail_sale } from './detail_sale.model.js'

export const product = sequelize.define('PRODUCTOS', {
    ID_PRODUCTO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Producto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Imagen: {
        type: DataTypes.BLOB,
        allowNull: false,
        unique: false
    }
});

product.hasMany(recipe, {
    foreignKey: 'ID_PRODUCTO',
    sourceKey: 'ID_PRODUCTO'
})

recipe.belongsTo(product, {
    foreignKey: 'ID_PRODUCTO',
    targetId: 'ID_PRODUCTO'
})

product.hasMany(detail_sale, {
    foreignKey: 'ID_PRODUCTO',
    sourceKey: 'ID_PRODUCTO'
})

detail_sale.belongsTo(product, {
    foreignKey: 'ID_PRODUCTO',
    targetId: 'ID_PRODUCTO'
})