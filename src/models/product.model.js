import { DataTypes } from 'sequelize';
import { sequelize } from '../db/dataBase.js';
import { recipe } from './recipe.model.js';

export const product = sequelize.define('PRODUCTOS', {
    ID_PRODUCTO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Producto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            noSpecialCharacters(value) {
                const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                if (specialCharacters.test(value)) {
                    throw new Error('Este campo no puede contener caracteres especiales');
                }
            },
            noNumbers(value) {
                if (/[0-9]/.test(value)) {
                    throw new Error('Este campo no puede contener números');
                }
            }
        }
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El precio es requerido'
            },
            isDecimal: {
                args: [true],
                msg: 'El precio debe ser un valor decimal'
            },
            min: {
                args: [50.00],
                msg: 'El precio debe ser al menos 50.00'
            }
        }
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
            notNull: {
                msg: 'El estado es requerida'
            }
        }
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