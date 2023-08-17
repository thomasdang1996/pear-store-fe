import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { ProductRoutes } from './pages/products/ProductRoutes'
import { ShoppingCart } from './pages/shopping-cart/ShoppingCart'
import './css/App.css'
import './css/NavBar.css'
import './css/Dropdown.css'
import { useState } from 'react'
import { useOutsideClick } from './utils/OutsideClickEventListener'
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  function showDropdown() {
    if (isOpen) {
      return (
        <div id="cart-dropdown" className='cart-dropdown dropdown sticky padded'>
          <ShoppingCart/>
        </div>
      )
    }
  }
  return (
    <>
      <header className='sticky'>
        <nav className='nav-container sticky'>
          <ul className='ul-container'>
            <li className='nav-logo padded'>
              <Link to="/"><h1>pearstore.</h1></Link>
            </li>

            < li className='nav-products padded'>
              <Link to="/phones">Phones</Link>
              <Link to="/tablets">Tablets</Link>
            </li>

            <li className='nav-user padded'>
              <button
                ref={useOutsideClick(() => setIsOpen(false))}
                onClick={() => setIsOpen(!isOpen)} >
                <Link className='shopping-cart'>
                  <i className="fa-solid fa-cart-shopping" />
                </Link>
              </button>
              <Link id='user-link'><i className="fa-solid fa-user" /></Link>
            </li>
          </ul>
        </nav>

        <div className='shopping-part'>
          {showDropdown()}
        </div>

      </header>

      <main className='main padded'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/phones/*" element={<ProductRoutes  {... { title: "Phones", path: "phones", code: "PHN" }} />} />
          <Route path='/tablets/*' element={<ProductRoutes  {... { title: "Tablets", path: "tablets", code: "TBLT" }} />} />
        </Routes>
      </main>
    </>
  )
}
