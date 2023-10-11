import React, { useState, useEffect } from "react";
import './css/FormProduct.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//import SelectCategory from '../components/selectCategory';

function ProductForm() {
    let { id } = useParams();
    const ID_PRODUCTO = parseInt(id, 10);
    const [options, setOptions] = useState([]);
    const [formValues, setFormValues] = useState([]);

    useEffect(() => {
        const GetCategory = async () => {
            try {
                const response = await axios.get('http://localhost:4000/category_products');
                setOptions(response.data.Nombre_Categoria);
            } catch (error) {
                console.error('Error fetching options from the database:', error);
            }
        };

        GetCategory();
    }, []);

    const handleInputChange2 = async (e) => {
        const { name, value } = e.target;
        await axios.put(`http://localhost:4000/product/${ID_PRODUCTO}`)

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
        await axios.put(`http://localhost:4000/products/${ID_PRODUCTO}`)
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
                    name="NombreProducto"
                    checked={formValues.NombreProducto}
                    onChange={handleInputChange}
                />

                <label>Precio: </label>
                <input
                    type="number"
                    name="Precio"
                    value={formValues.Precio}
                    onChange={handleInputChange}
                /><br />

                <label htmlFor="options">Seleccionar categoria:</label>
                <input
                    type="number"
                    name="CATEGORIA_PRODUCTO_ID"
                    value={formValues.CATEGORIA_PRODUCTO_ID}
                    onChange={handleInputChange}
                />
                {/* <select
                    id="options"
                    name="CATEGORIA_PRODUCTO_ID"
                    value={formValues.CATEGORIA_PRODUCTO_ID}
                    onChange={handleInputChange}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> */}
            </form>
            <button
                type="button"
                onClick={handleInputChange2}
                className="custom_button"
            >
                Guardar
            </button>
        </div>
    );
}

export default ProductForm;