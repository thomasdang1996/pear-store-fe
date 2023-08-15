import { useEffect, useState } from "react"

export function ShoppingCart() {
    // const accountId = '44444'
    const [shoppingList, setShoppingList] = useState(()=>{return JSON.parse(localStorage.getItem('cart'))||[]})
    // const BE_ORDER = import.meta.env.VITE_PEARSTORE_BE_ORDER
    // useEffect(() => {
    //     fetch(`${BE_ORDER}/all?accountId=${accountId}`)
    //         .then(response => response.json())
    //         .then(json => setShoppingList(json.orders))
    // }
    //     , [])

    function toShoppingCartItem(item) {
        return (<>
         <li key={item.id}>
            <p>{JSON.stringify(item)}</p>
         </li>
        </>)
    }
    return (
        <>
            <h1>{shoppingList.map(toShoppingCartItem)}</h1>
        </>
    )
}