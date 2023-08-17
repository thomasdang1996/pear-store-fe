import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { ProductRoutes } from './pages/products/ProductRoutes'
import { ShoppingCart } from './pages/shopping-cart/ShoppingCart'
import './css/App.css'
import './css/NavBar.css'
export default function App() {
  return (
    <>
      <header className='nav-container sticky'>
        <nav className='nav-logo padded'>
          <Link to="/"><h1>pearstore.</h1></Link>
        </nav>
        
        <nav className='nav-products padded'>
          <ul className='padded'>
            <li><Link to="/phones">Phones</Link></li>
            <li><Link to="/tablets">Tablets</Link></li>
          </ul>
        </nav>

        <nav className='nav-user padded'>
          <Link to="/shopping-cart"><i class="fa-solid fa-cart-shopping"></i></Link>
          <Link ><i class="fa-solid fa-user"></i></Link>
        </nav>
      </header>

      <main className='padded'>
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
