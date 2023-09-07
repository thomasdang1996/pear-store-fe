import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { ProductRoutes } from './pages/products/ProductRoutes'
import { ShoppingCart } from './pages/shopping-cart/ShoppingCart'
import { User } from './pages/user-account/User'
import './App.css'
import './NavBar.css'
import { handleOutsideClick } from './utils/OutsideClickEventListener';
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

export default function App() {
  const [key, setKey] = useState()

  // update dropdown-btn-div key to re-render shopping cart
  useEffect(() => {
    window.addEventListener('storage', () => setKey(v4))
  }, [])
  return (
    <>
      <header className='sticky'>
        <nav className='nav-container'>
          <ul className='ul-container'>
            <li className='nav-logo'>
              <Link to="/"><h1>pearstore.</h1></Link>
            </li>

            < li className='nav-products'>
              <Link to="/phones">Phones</Link>
              <Link to="/tablets">Tablets</Link>
            </li>

            <li className='nav-user'>
              <div className='dropdown-btn-div' key={key} cart-dropdown='true'>
                <button className='dropdown-button' ref={handleOutsideClick("[cart-dropdown]", 'remove-button')} >
                  <i className="fa-solid fa-cart-shopping" />
                </button>
                <ShoppingCart />
              </div>
              <div className='dropdown-btn-div' user-dropdown='true'>
                <button className='dropdown-button' ref={handleOutsideClick("[user-dropdown]")} >
                  <i className="fa-solid fa-user" />
                </button>
                <User />
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <main className='main padded'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path="/phones/*"
            element={<ProductRoutes  {... { title: "Phones", path: "phones", code: "PHN" }} />} />
          <Route
            path='/tablets/*'
            element={<ProductRoutes  {... { title: "Tablets", path: "tablets", code: "TBLT" }} />} />
        </Routes>
      </main>
    </>
  )
}
