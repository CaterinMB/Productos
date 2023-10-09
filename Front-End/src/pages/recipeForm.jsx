import React, { useState, useEffect } from "react";
import './css/Product.css';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

function RecipeForm() {
    let { id } = useParams()
    const [List_Product, setList_Product] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/RecipeWProduct/${id}`).then((response) => {
            setList_Product(response.data)
        })
    }, [updateTrigger])
    const add = async (id) => {
        try {
            await axios.put(`http://localhost:4000/updateRecipe_add/${id}`);

        } catch (error) {
            console.log(error);
            console.log(id)
        }
    };

    const SubsTract = async (id) => {
        try {
            await axios.put(`http://localhost:4000/updateRecipe_substract/${id}`);

        } catch (error) {
            console.log(error);
            console.log(id)
        }
    };

    function getProduct() {
        List_Product.map(value, key)
        return List_Product.map((value, key) => (
            <tr>
                <td scope="row">{value.ID_INSUMO}</td>
                <td scope="row" ><button className='add_cuantity' onClick={() => SubsTract(value.ID_DETALLE_VENTA)}><AiOutlineMinusCircle /></button>{value.Cantidad} <button className='subtract_cuantity' onClick={() => add(value.ID_DETALLE_VENTA)}><AiOutlinePlusCircle /></button> </td>
            </tr>
        ))
    }

    return (
        <div className='details'>
            <div className="back">
            <Link to="/product">
                    <button className="back-button">
                        &#8592; Regresar
                    </button>
                </Link>
            </div>
            <div>
                <h1 className='Title-Recipe'>Producto {id}</h1>
            </div>
            <table className="table_recipe">
                <thead>
                    <tr>
                        <th scope="col">Insumo</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {getProduct()}
                </tbody>
            </table>
        </div>
    )
}

export default RecipeForm;