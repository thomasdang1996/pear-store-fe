import { Routes, Route } from "react-router-dom";
import { Product } from './Product'
import { Error } from "../error/Error"
import { ProductList } from "./ProductList";
export function ProductRoutes(productData) {
    return (
        <>
            <Routes>
                <Route index element={<ProductList {...productData} />} />
                <Route path=":id" element={<Product />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    )
}