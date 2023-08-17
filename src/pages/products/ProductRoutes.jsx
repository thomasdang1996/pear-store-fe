import { Routes, Route } from "react-router-dom";
import { Product } from './Product'
import { CategoryContext } from './CategoryContext'

import { Error } from "../error/Error"
import { ProductList } from "./ProductList";
export function ProductRoutes(productData) {

    return (
        <CategoryContext.Provider value={productData}>
            <Routes>
                <Route index element={<ProductList />} />
                <Route path=":id" element={<Product />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </CategoryContext.Provider>
    )
}