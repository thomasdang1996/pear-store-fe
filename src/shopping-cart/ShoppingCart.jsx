import { useEffect, useState } from "react"

export function ShoppingCart() {
    // use state - 2 vars: state and state-updating function
    const [shoppingCart, setShoppingCart] = useState(() =>  JSON.parse(localStorage.getItem('cart')) || [] )
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

    function removeItem(productId) {
        setShoppingCart(currentShoppingCart =>
            currentShoppingCart.filter(item => item.id !== productId))
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
        return (
            <tr key={item.id}>
                <td key='productName'> {item.name}</td>
                <td key='amount'>
                    <button onClick={() => decreaseAmount(item.id)}>-</button>
                    <span>{item.amount}</span>
                    <button onClick={() => increaseAmount(item.id)}>+</button>
                </td>
                <td key='price'>{item.price}</td>
                <td>
                    <button onClick={() => removeItem(item.id)}> remove </button>
                </td>
            </tr>
        )

    }
    return (
        <>
        <h1>Shopping Cart</h1>
            <table>
                <tbody key='body'>
                    {shoppingCart.map(toShoppingCartItem)}
                </tbody>
                <tfoot>
                    <tr>
                        <td key='productName'>Total</td>
                        <td key='amount'></td>
                        <td key='price'>{totalCost}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}