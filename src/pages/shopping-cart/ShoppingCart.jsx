import { useEffect, useState } from "react"
import "../Pages.css"
import "./ShoppingCart.css"
import "../../dropdown/Dropdown.css"
export const ShoppingCart = () => {
    // use state - 2 vars: state and state-updating function
    const [shoppingCart, setShoppingCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])
    const [totalCost, setTotalCost] = useState(0)

    //  || falsy and truthy values (https://stackoverflow.com/questions/10463025/what-do-two-vertical-lines-in-an-object-value-mean-in-javascript)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(shoppingCart))
        setTotalCost(() =>
            shoppingCart.length != 0
                ? shoppingCart
                    .map(item => item.price * item.amount)
                    .reduce((total, num) => total + num)
                : 0)
    }, [shoppingCart]
    )


    function toLink(item) {
        console.log(item);
        return (
            <a href={item.path}>{item.name}</a>
        )
    }

    function removeItem(currentProductId) {
        setShoppingCart(currentShoppingCart =>
            currentShoppingCart.filter(item => item.id != currentProductId))
    }

    function increaseAmount(currentProductId) {
        setShoppingCart(currentShoppingCart =>
            currentShoppingCart.map(
                item => item.id == currentProductId
                    ? { ...item, amount: item.amount + 1 }
                    : item
            ))
    }

    function decreaseAmount(currentProductId) {
        setShoppingCart(currentShoppingCart =>
            currentShoppingCart.map(
                item => item.id == currentProductId && item.amount > 1
                    ? { ...item, amount: item.amount - 1 }
                    : item
            ))
    }

    function toShoppingCartItem(item) {
        if (item != null) {
            return (
                <ul className="product-item" key={item.id}>
                    <li className='product-name' key='product-name'>{toLink(item)}</li>
                    <li key='amount' className="amount">
                        <button className='btn' onClick={() => decreaseAmount(item.id)}>-</button>
                        <span>{item.amount}</span>
                        <button className='btn' onClick={() => increaseAmount(item.id)}>+</button>
                    </li>
                    <li key='price' className="price">{item.price}</li>
                    <li key='remove' className="remove">
                        <button className="remove-button" id='remove-button' onClick={() => removeItem(item.id)}>remove</button>
                    </li>
                </ul>
            )
        }
    }
    return (
        <div id="cart-dropdown" style={{ minWidth: "500px" }} className='dropdown'>
            <h3 className="title">Shopping Cart</h3>

            <div className="product-list">
                {shoppingCart.map(toShoppingCartItem)}
            </div>

            <div className="total-item">
                <p className="total-text">Total</p>
                <p className="total-value">{totalCost}</p>
            </div>
        </div>
    )
}
export default ShoppingCart