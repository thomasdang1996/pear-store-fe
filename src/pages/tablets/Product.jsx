import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';



export function Product() {
    const { id } = useParams()
    const [count, setCount] = useState(0)
    const [product, setProduct] = useState({})
    const [cart, setCart] = useState(() => { return JSON.parse(localStorage.getItem('cart')) || [] })
    const BE_ORDER = import.meta.env.VITE_PEARSTORE_BE_ORDER
    const BE_PRODUCT = import.meta.env.VITE_PEARSTORE_BE_PRODUCT

    useEffect(() => {
        fetch(BE_PRODUCT + '?productId=' + id)
            .then(response => response.json())
            .then(json => {
                setProduct(() => json)
                localStorage.setItem(
                    'cart',
                    JSON.stringify(cart))
            })
    }, [cart])

    function addToDb() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }

        function validateStatus(status) {
            console.log('status is: ' + status)
        }

        fetch(BE_ORDER, requestOptions)
            .then(response => response.status)
            .then(status => validateStatus(status))
    }

    function validatedCart(currentCart) {
        const body = {
            id: uuidv4(),
            productId: id,
            amount: count,
            productTypeCode: product.productTypeCode
        }
        var isInList = currentCart.some(item => item.productId === body.productId)
        return isInList
            ? currentCart.map(item => item.productId === body.productId ? body : item)
            : [...currentCart, body]
    }

    return (
        <>
            <section>
                <h2> {product.name}</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean placerat. Duis viverra diam non justo. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Sed vel lectus. </p>
            </section>
            <div className="AmountCounter">
                <div>
                    <button onClick={() => setCount(num => num - 1)}>-</button>
                    <span>{count}</span>
                    <button onClick={() => setCount(num => num + 1)}>+</button>
                </div>
                <button onClick={() => setCart(validatedCart)}>Add</button>
            </div>

        </>
    )
}