import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { supplies } from './supplies.model.js';

export const category_supplies = sequelize.define('CATEGORIA_INSUMOS', {
    ID_CATEGORIA_INSUMO: {
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

category_supplies.hasMany(supplies, {
    foreignKey: 'ID_CATEGORIA_INSUMO',
    sourceKey: 'ID_CATEGORIA_INSUMO'
})

supplies.belongsTo(category_supplies, {
    foreignKey: 'ID_CATEGORIA_INSUMO',
    targetId: 'ID_CATEGORIA_INSUMO'
})