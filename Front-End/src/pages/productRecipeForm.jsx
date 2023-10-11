import React, { useState, useEffect } from "react";
import './css/ProductRecipeForm.css';
import RecipeForm from './recipeForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './productForm';

function ProductRecipeForm() {
    let { id } = useParams();
    const ID_PRODUCTO = parseInt(id, 10);
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const [ListSupplies, setListSupplies] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/supplies").then((response) => {
            setListSupplies(response.data)
        })
    }, [])

    function getSupplies() {
        return (
            <div>
                {ListSupplies.map((value, key) => (
                    <span key={value.ID_INSUMO}>
                        <button className="supplies_button" onClick={() => createDetail(value.ID_INSUMO)}>
                            {value.Nombre_Insumo}
                        </button>
                        {(key + 1) % 3 === 0 && <br />}
                    </span>
                ))}
            </div>
        );
    }

    const createDetail = async (ID_INSUMO, ) => {
        try {
            const dataToSend = {
                Cantidad: 1,
                ID_PRODUCTO: ID_PRODUCTO,
                ID_INSUMO: ID_INSUMO,
            };
            const response = await axios.post("http://localhost:4000/recipe", dataToSend);
            const update = await axios.put(`http://localhost:4000/products/${ID_PRODUCTO}`)

            setUpdateTrigger(!updateTrigger)

        } catch (error) {
            console.log(error);
        }
    };


    return (

        <div className="whole">

            <div className="formS">
                <ProductForm />
            </div>

            <div className="left-side">
                <div className="recipe_table">
                    <RecipeForm updateTrigger={updateTrigger} />
                </div>
            </div>
            <div className="rigth-side">
                {getSupplies()}

            </div>
        </div>



    );
}

export default ProductRecipeForm;