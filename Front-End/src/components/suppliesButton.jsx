import React, { useEffect, useState } from "react";

function SuppliesButton (){

    const [ListSupplies, setListSupplies] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/supplies").then((response) => {
            setListSupplies(response.data)
        })
    }, [])

    function getSupplies() {
        return ListSupplies.map((value, key) => (
            <th>
                <button className="button" onClick={createRecipe}>${value}</button>
            </th>
            
        ))
    }

    return{
        getSupplies
    }
}

export default SuppliesButton;