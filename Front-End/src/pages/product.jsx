import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Product.css';
import ReactPaginate from "react-paginate";
import { AiFillEdit, AiFillEye, AiOutlineEye } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function Product() {
    const [ product, setProduct ] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [estadoFilter, setEstadoFilter] = useState('Todos');
    const [ categoryNames, setCategoryNames ] = useState({});
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const productResponse = await axios.get(`http://localhost:4000/product`);
                setProduct(productResponse);

                const categoryNamesData = {};
                for (const product of productResponse) {
                    const categoryID = product.CATEGORIA_PRODUCTO_ID
                    if (categoryID !== null && !categoryNamesData[categoryID]) {
                        try {
                            const response = await axios.get(`http://localhost:4000/category_products/${categoryID}`);
                            categoryNamesData[categoryID] = response.data;
                        } catch (error) {
                            console.error(`Error: `, error)
                        }
                    }
                }
                setCategoryNames(categoryNamesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderCategoryName = (categoryID) => {
        const categoryName = categoryNames[categoryID];
        return categoryName;
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleEstadoFilterChange = (e) => {
        setEstadoFilter(e.target.value);
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    const filterProductByEstado = (product) => {
        const estadoMatch = estadoFilter === 'all' || (product.Estado ? 'Habilitado' : 'Deshabilitado') === estadoFilter;
        const categoryNameMatch = categoryFilter === '' || renderCategoryName(product.CATEGORIA_PRODUCTO_ID).toLowerCase().includes(categoryFilter.toLowerCase());
        return estadoMatch && categoryNameMatch;
    };

    const filteredProduct = product.filter(filterProductByEstado)

    const offset = currentPage * itemsPerPage;

    const currentPageData = filteredProduct.slice(offset, offset + itemsPerPage).map((product, index) => (
        <tr key={index}>
            <td>{product.Nombre_Producto}</td>
            <td>{product.CATEGORIA_PRODUCTO_ID ? renderCategoryName(product.CATEGORIA_PRODUCTO_ID) : ''}</td>
            <td>{product.Precio}</td>
            <td>{product.Estado ? "Habilitado" : "Deshabilitado"}</td>
            <td>
                <div className="edit-icons">
                    <Link to={`/recipeform/${product.ID_PRODUCTO}`}><AiFillEdit /></Link>
                    <Link to={`/recipe/${product.ID_PRODUCTO}`}><AiFillEye /></Link>
                </div>
            </td>
        </tr>
    ));

    const products = async () => {
        try {
            const response = await axios.post('http://localhost:4000/product', {
                Precio: 0
            });
            const { ID_PRODUCTO } =response.data;
            window.location.href = `http://localhost:5173/recipeform/${ID_PRODUCTO}`;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Product">
            <h1 className="product_Title">Productos</h1>
        </div>
    )

}