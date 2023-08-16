import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from './CategoryContext'

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
        return <li key={product.id}>
            <Link to={`/${productData.path}/${product.id}`}>{product.name}</Link>
            <br />
        </li>
    }

    return (
        <>
            <h1>{productData.title}</h1>
            <div>
                {productList.map(toProductLink)}
            </div>
        </>
    )
}