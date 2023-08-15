import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { ProductRoutes } from './pages/tablets/ProductRoutes'
import { ShoppingCart } from './shopping-cart/ShoppingCart'
export default function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/phones">Phones</Link></li>
            <li><Link to="/tablets">Tablets</Link></li>
            <li><Link to="/shopping-cart">Shopping Cart</Link></li>
          </ul>
        </nav>
      </header>
      <main>


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/phones/*" element={<ProductRoutes  {... { title: "Phones", path: "phones", code: "PHN" }} />} />
          <Route path='/tablets/*' element={<ProductRoutes  {... { title: "Tablets", path: "tablets", code: "TBLT" }} />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
        </Routes>
      </main>
    </>
  )
}
