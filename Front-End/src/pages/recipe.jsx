import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import './css/Product.css';

function Recipe(updateTrigger) {
    let { id } = useParams()
    const [List_Products, setList_Products] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/RecipeWProduct/${id}`).then((response) => {
            setList_Products(response.data)
        })
    }, [updateTrigger])

    function getProduct() {
        List_Products.map(value, key)
        return List_Products.map((value, key) => (
            <tr>
                <td scope="row">{value.ID_INSUMO}</td>
                <td scope="row">{value.Cantidad}</td>
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

export default Recipe;