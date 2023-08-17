import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from './CategoryContext'
import { Grid } from "@mui/material";
import "../Pages.css"
import "../BreadCrumbNav.css"
import image from "./phone.png"
export function ProductList() {
    const productData = useContext(CategoryContext)
    const [productList, setProductList] = useState([])
    const BE_PRODUCT = import.meta.env.VITE_PEARSTORE_BE_PRODUCT

    useEffect(
        () => {
            fetch(`${BE_PRODUCT}/getProductNames?productTypeCode=${productData.code}`)
                .then(response => response.json())
                .then(json => {
                    setProductList(json.products)
                })
        }, [productData]
    )

    function toProductLink(product) {
        return (
            <Grid item style={{ marginBottom: 40, padding: 20 }} key={product.id}>
                <Link to={`/${productData.path}/${product.id}`} className="grid-item" >
                    <img className="image" src={image}></img>
                    <b>{product.name}</b>
                </Link>
            </Grid>
        )
    }

    return (
        <div className='page'>
            <ul className="bread-crumb">
                <li>
                    <Link to={`/`}>
                        <i className="fa-solid fa-house" />
                    </Link>
                </li>
            </ul>
            <h1 className="title">{productData.title}</h1>
            <div>
                <Grid className="grid-container" container spacing={2}>
                    {productList.map(toProductLink)}
                </Grid>
            </div>
        </div>
    )
}