import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { recipe } from './recipe.model.js';

export const product = sequelize.define('PRODUCTOS', {
    ID_PRODUCTO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreProducto: {
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        // allowNull: false
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: false
});

product.hasMany(recipe, {
    foreignKey: 'ID_PRODUCTO',
    sourceKey: 'ID_PRODUCTO'
})

recipe.belongsTo(product, {
    foreignKey: 'ID_PRODUCTO',
    targetId: 'ID_PRODUCTO'
})