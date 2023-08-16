import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"

export function Product() {
    const { id: currentProductId } = useParams()
    const [count, setCount] = useState(0)
    const [product, setProduct] = useState({})
    const [cart, setCart] = useState(() => { return JSON.parse(localStorage.getItem('cart')) || [] })
    const currentLocation = useLocation()
    const BE_PRODUCT = import.meta.env.VITE_PEARSTORE_BE_PRODUCT

    useEffect(() => {
        fetch(BE_PRODUCT + '?productId=' + currentProductId)
            .then(response => response.json())
            .then(json => {
                setProduct(() => json)
                localStorage.setItem('cart', JSON.stringify(cart))
            })
    }, [cart])

    function validatedCart(currentCart) {
        const orderItem = { ...product, amount: count, path: currentLocation }
        console.log(JSON.stringify(orderItem))
        var isInList = currentCart.some(item => item.id == currentProductId)
        return isInList
            ? currentCart.map(item => item.id == currentProductId ? orderItem : item)
            : [...currentCart, orderItem]
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