import React, { useState, useEffect } from "react";
import './css/Product.css';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

function RecipeForm({ updateTrigger }) {
    let { id } = useParams();
    const [List_Product, setList_Product] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    useEffect(() => {
        fetchData();
    }, [updateTrigger]);

    const fetchData = () => {
        axios.get(`http://localhost:4000/RecipeWProduct/${id}`).then((response) => {
            setList_Product(response.data)
        })
    }

    const Add = async (id) => {
        try {
            await axios.put(`http://localhost:4000/updateRecipe_add/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const SubsTract = async (id) => {
        try {
            await axios.put(`http://localhost:4000/updateRecipe_substract/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = List_Product.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(List_Product.length / itemsPerPage); i++) {
        pageNumbers.push(i);
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
                    {currentItems.map((value, key) => (
                        <tr key={key}>
                            <td scope="row">{value.ID_INSUMO}</td>
                            <td scope="row">
                                <button
                                    className="add_cuantity"
                                    onClick={() => SubsTract(value.ID_RECETA)}
                                    disabled={value.Cantidad === 1}
                                >
                                    <AiOutlineMinusCircle />
                                </button>
                                {value.Cantidad}
                                <button
                                    className="subtract_cuantity"
                                    onClick={() => Add(value.ID_RECETA)}
                                >
                                    <AiOutlinePlusCircle />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination text-center mt-4 mx-auto ml-auto">
                <div className="pagination_c">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-orange-700 text-white' : 'bg-orange-400 hover:bg-orange-600 text-black'}`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecipeForm;