import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { ProductRoutes } from './pages/products/ProductRoutes'
import { ShoppingCart } from './pages/shopping-cart/ShoppingCart'
import './App.css'
import './NavBar.css'
import './pages/user-account/User.css'
import './pages/shopping-cart/ShoppingCart.css'
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
              <div className='cart-dd-div dropdown-btn-div' key={key}>
                <button className='cart-button'
                  ref={handleOutsideClick(".cart-button", ".cart-dd-div", 'remove-button')}
                >
                  <i className="fa-solid fa-cart-shopping" />
                </button>

              
                  <ShoppingCart />
            
              </div>
              <div className='user-dd-div dropdown-btn-div'>
                <button className='user-button'
                  ref={handleOutsideClick(".user-button", ".user-dd-div")}
                >
                  <i className="fa-solid fa-user" />
                </button>
                <div className='dropdown'>
                  Some content
                </div>
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
