import React, { useState, useEffect } from "react";
import './css/FormProduct.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SelectCategory from '../components/selectCategory';

function ProductForm() {
    let { id } = useParams();
    const intID_PRODUCTO = parseInt(id, 10);

    const handleInputChange2 = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
        updateFormData();
        window.location.href = "/product"
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
        updateFormData();
    };

    const updateFormData = async () => {
        await axios.put(`http://localhost:4000/product/${intID_PRODUCTO}`)
            .then(response => {
                console.log('Datos actualizados con éxito', response.data);
            })
            .catch(error => {
                console.error('Error al actualizar los datos', error);
            });
    };

    return (
        <div className="product-form-container">
            <form>
                <label>Nombre: </label>
                <input
                    type="text"
                    name="Nombre_Producto"
                    checked={formValues.Nombre_Producto}
                    onChange={handleInputChange}
                />

                <label>Precio: </label>
                <input
                    type="number"
                    name="Precio"
                    value={formValues.Precio}
                    onChange={handleInputChange}
                />

                <SelectCategory />
                
                <button
                    type="button"
                    onClick={handleInputChange2}
                    className="custom_button"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default ProductForm;