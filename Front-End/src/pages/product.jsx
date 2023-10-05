import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Product.css';
import ReactPaginate from "react-paginate";

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
            <td>{product.Nombre}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <div>
                    <Link to={`/recipeform/`}></Link>
                </div>
            </td>
        </tr>
    ))

}