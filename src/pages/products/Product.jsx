import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import image from "./phone.png"
import "../Pages.css"
import "./Product.css"
import "../BreadCrumbNav.css"
import { CategoryContext } from "./CategoryContext";

export function Product() {
    const { id: currentProductId } = useParams()
    const [count, setCount] = useState(0)
    const [product, setProduct] = useState({})
    const [cart, setCart] = useState(() => { return JSON.parse(localStorage.getItem('cart')) || [] })
    const currentLocation = useLocation()
    const BE_PRODUCT = import.meta.env.VITE_PEARSTORE_BE_PRODUCT
    const productCategory = useContext(CategoryContext)

    useEffect(() => {
        fetch(BE_PRODUCT + '?productId=' + currentProductId)
            .then(response => response.json())
            .then(json => {
                setProduct(() => json)
                localStorage.setItem('cart', JSON.stringify(cart))
                dispatchEvent(new Event("storage"));
            })
    }, [cart])

    function validatedCart(currentCart) {
        const orderItem = { ...product, amount: count, path: window.location.href }
        var isInShoppingCart = currentCart.some(item => item.id == currentProductId)
        return isInShoppingCart
            ? currentCart.map(item => item.id == currentProductId ? orderItem : item)
            : [...currentCart, orderItem]
    }

    return (
        <div className='page'>
            <ul className="bread-crumb">
                <li>
                    <Link to={`/`}>
                        <i className="fa-solid fa-house" />
                    </Link>
                </li>
                <li>
                    <Link to={`/${productCategory.path}`}>
                        {productCategory.title}
                    </Link>
                </li>
            </ul>
            <section className="product-description">
                <section className="text-and-buttons">
                    <h1 className='product-title'> {product.name}</h1>
                    <p className="product-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean placerat. Duis viverra diam non justo. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Sed vel lectus. </p>
                    <div className="amount-counter">
                        <button className="amount-counter-item" onClick={() => setCount(num => num - 1)}>-</button>
                        <span className="amount-counter-item"> {count}</span>
                        <button className="amount-counter-item" onClick={() => setCount(num => num + 1)}>+</button>
                        <button className="amount-counter-item" onClick={() => setCart(validatedCart)}>Add to Cart</button>
                    </div>
                </section>

                <img className="product-image" src={image} alt="phone"></img>
            </section>

            <section className="recommendation">
                <h1>People are also interested in: </h1>
            </section>
        </div>
    )
}