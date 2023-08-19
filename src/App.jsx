import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { ProductRoutes } from './pages/products/ProductRoutes'
import { ShoppingCart } from './pages/shopping-cart/ShoppingCart'
import './css/App.css'
import './css/NavBar.css'
import './pages/user-account/User.css'
import { useState } from 'react'
import {  handleOutsideClick } from './utils/OutsideClickEventListener'
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  function showDropdown() {
    if (isOpen) {
      return (
        <ShoppingCart />
      )
    }
  }


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
              <button
                className='shopping-cart'
                ref={handleOutsideClick(() => setIsOpen(false))}
                onClick={() => setIsOpen(!isOpen)} >
                <i className="fa-solid fa-cart-shopping" />
              </button>
              <div className='user-button-div'>
                <button className='user-button'>
                  <i className="fa-solid fa-user" />
                </button>
                <div className='drop-down'>
                  Some content
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {showDropdown()}
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
