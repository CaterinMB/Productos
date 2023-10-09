import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Product.css';
import ReactPaginate from "react-paginate";
import { AiFillEdit, AiFillEye, AiOutlineEye } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

function Product() {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [estadoFilter, setEstadoFilter] = useState('Todos');
    const [categoryNames, setCategoryNames] = useState({});
    const [categoryFilter, setCategoryFilter] = useState('');

    const barraClass = product.Estado ? "" : "desactivado";

    useEffect(() => {
        const fetchData = async () => {
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
        const estadoMatch = estadoFilter === 'Todos' || (product.Estado ? 'Habilitado' : 'Deshabilitado') === estadoFilter;
        const categoryNameMatch = categoryFilter === '' || renderCategoryName(product.CATEGORIA_PRODUCTO_ID).toLowerCase().includes(categoryFilter.toLowerCase());
        return estadoMatch && categoryNameMatch;
    };

    const filteredProduct = product.filter(filterProductByEstado)

    const offset = currentPage * itemsPerPage;

    const currentPageData = filteredProduct.slice(offset, offset + itemsPerPage).map((product, index) => (
        <tr key={index}>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{product.Nombre_Producto}</td>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{product.CATEGORIA_PRODUCTO_ID ? renderCategoryName(product.CATEGORIA_PRODUCTO_ID) : ''}</td>
            <td className="border border-gray-400 px-4 py-2 text-center width-column">{product.Precio}</td>
            <td className={`border border-gray-400 px-4 py-2 text-center width-column ${barraClass}`}>{product.Estado ? "Habilitado" : "Deshabilitado"}</td>
            <td>
                <div className="edit-icons">
                    <Link to={`/recipeform/${product.ID_PRODUCTO}`}><AiFillEdit /></Link>
                    <Link to={`/recipe/${product.ID_PRODUCTO}`}><AiFillEye /></Link>
                    <div
                        className={`barra-container ${barraClass} adjust`}
                        style={{ marginRight: "-100px" }}
                        onClick={handleToggleRoleStatus}
                    >
                        <div className={`circulo ${barraClass}`}>
                            {role.Estado ? (
                                <MdToggleOn className={`estado-icon active ${barraClass}`} />
                            ) : (
                                <MdToggleOff className={`estado-icon inactive ${barraClass}`} />
                            )}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    ));

    const click = async () => {
        try {
            const response = await axios.post('http://localhost:4000/product', {
                Precio: 0
            });
            const { ID_PRODUCTO } = response.data;
            window.location.href = `http://localhost:5173/recipeform/${ID_PRODUCTO}`;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='Product'>
            <h1 className='product_Title'>Productos</h1>
            <div className="button-cont">
                <button className='NewButton' onClick={() => click()}>Nuevo producto</button>
            </div>
            <div className="filter_container">
                <label htmlFor="Estado">Estado:</label>
                <select
                    id="Estado"
                    value={estadoFilter}
                    onChange={handleEstadoFilterChange}
                >
                    <option value="Todos">Todos</option>
                    <option value="Habilitado">Habilitado</option>
                    <option value="Deshabilitado">Deshabilitado</option>
                </select>
            </div>
            <div className="filter_container">
                <label htmlFor="categoryFilter">mesero: </label>
                <input
                    type="text"
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={handleCategoryFilterChange}
                />
            </div>
            <div className="product_table">
                <table className="table_products">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filteredSales.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousClassName={'pagination-item'}
                    nextClassName={'pagination-item'}
                    pageClassName={'pagination-item'}
                    breakClassName={'pagination-item'}
                    disabledClassName={'pagination-disabled'}
                />
            </div>
            {selectedSaleId !== null && (
                <PaymentMethodModal
                    isOpen={true}
                    onRequestClose={closeModal}
                    onSelectPaymentMethod={handlePaymentMethodSelect}
                    id={selectedSaleId}
                />
            )}
        </div>
    )

}

export default Product;