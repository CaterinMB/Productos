import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Product.css';
import ReactPaginate from "react-paginate";

function Product() {
    const [ product, setProduct ] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const productResponse = await axios.get(`http://localhost:4000/category_products/${waiterID}`);
                const sortedProduct = productResponse.data.sort((a, b) => a.ID)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    })
}