import { useEffect, useState } from "react"

export function ShoppingCart() {
    // use state - 2 vars: state and state-updating function
    const [shoppingCart, setShoppingCart] = useState(() => { return JSON.parse(localStorage.getItem('cart')) || [] })

    useEffect(() =>
        localStorage.setItem('cart', JSON.stringify(shoppingCart)),
        [shoppingCart]
    )

    function removeItem(productId) {
        setShoppingCart(currentShoppingCart =>
            currentShoppingCart.filter(item => item.productId !== productId))
    }

    function increaseAmount(currentProductId) {
        setShoppingCart(currentShoppingCart =>
            currentShoppingCart.map(
                item => item.productId == currentProductId
                    ? { ...item, amount: item.amount + 1 }
                    : item
            ))
    }

    function decreaseAmount(currentProductId) {
        setShoppingCart(currentShoppingCart =>
            currentShoppingCart.map(
                item => item.productId == currentProductId && item.amount > 1
                    ? { ...item, amount: item.amount - 1 }
                    : item
            ))
    }

    function getTotal() {
        return (
            <tr>
                <td key='productName'>
                    Total
                </td>
                <td key='amount'>
                </td>
                <td key='price'>
                    {shoppingCart.map(item => item.price * item.amount).reduce((total, num) => total + num)}
                </td>
            </tr>
        )
    }
    
    function toShoppingCartItem(item) {
        console.log(item.productId)
        return (
            <tr key={item.productId}>
                <td key='productName'>
                    {item.productName}
                </td>
                <td key='amount'>
                    <button onClick={() => decreaseAmount(item.productId)}>-</button>
                    <span>{item.amount}</span>
                    <button onClick={() => increaseAmount(item.productId)}>+</button>
                </td>
                <td key='price'>
                    {item.price}
                </td>
                <td>
                    <button onClick={() => removeItem(item.productId)}> remove </button>
                </td>
            </tr>
        )

    }
    return (
        <>
            <table>
                <tbody key='body'>
                    {shoppingCart.map(toShoppingCartItem)}
                </tbody>
                <tfoot>
                    {getTotal()}
                </tfoot>
            </table>
        </>
    )
}