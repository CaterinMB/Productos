import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { detail_shopping } from './detail_shopping.model.js';
import { recipe } from './recipe.model.js';

export const supplies = sequelize.define('INSUMOS', {
    ID_INSUMOS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Insumo: {
        type: DataTypes.STRING,
        required: true
    },
    Cantidad_Insumo: {
        type: DataTypes.SMALLINT,
        // defaultValue: 0,
        required: true
    },
    Imagen: {
        type: DataTypes.BLOB,
        required: true
    },
    Stock_Minimo: {
        type: DataTypes.INTEGER,
        required: true
    }
});

supplies.hasMany(detail_shopping, {
    foreignKey: 'ID_INSUMOS',
    sourceKey: 'ID_INSUMOS'
})

detail_shopping.belongsTo(supplies, {
    foreignKey: 'ID_INSUMOS',
    targetId: 'ID_INSUMOS'
})

supplies.hasMany(recipe, {
    foreignKey: 'ID_INSUMOS',
    sourceKey: 'ID_INSUMOS'
})

recipe.belongsTo(supplies, {
    foreignKey: 'ID_INSUMOS',
    targetId: 'ID_INSUMOS'
})