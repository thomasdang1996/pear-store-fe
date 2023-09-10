import { Link, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { ProductRoutes } from './pages/products/ProductRoutes'
import { ShoppingCart } from './pages/shopping-cart/ShoppingCart'
import { User } from './pages/user-menu/User'
import './App.css'
import './NavBar.css'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

export default function App() {
  const [storageKey, setStorageKey] = useState(v4)
  const [dropdowns, setDropdowns] = useState(
    [
      {
        name: 'cart-dropdown',
        visible: false,
        image: <i className="fa-solid fa-cart-shopping" />,
        component: <ShoppingCart />,
        ignored: 'remove-button',
        uniqueKey: true
      },
      {
        name: 'user-dropdown',
        visible: false,
        image: <i className="fa-solid fa-user" />,
        component: <User />
      },
      {
        name: 'random-dropdown',
        visible: false,
        image: <i className="fa-solid fa-user" />,
        component: <User />
      }
    ]
  )

  function openDropdown(dropdownName) {
    const isVisible = dropdowns
      .filter(dropdown => dropdown.name == dropdownName)[0]
      .visible
    setDropdowns(
      currentDropdowns =>
        currentDropdowns.map(
          dropdown => dropdown.name == dropdownName
            ? { ...dropdown, visible: !isVisible }
            : { ...dropdown, visible: false }
        )
    )
  }

  // update dropdown key to re-render shopping cart
  useEffect(() => {
    window.addEventListener('storage', () => setStorageKey(v4))
    const handleEvent = event => {
      if (event.target.closest([".dropdown"]) == null) {
        setDropdowns(
          dropdowns => dropdowns.map(dropdown => {
            if (dropdown.ignored == event.target.className) {
              return dropdown
            }
            return { ...dropdown, visible: false }
          })
        )
      }
    }
    document.addEventListener('click', handleEvent)
    return () => document.removeEventListener('click', handleEvent)
  }, [])

  function getDropDownDom(dropdown) {
    const isUnique = dropdown.uniqueKey
    ? storageKey
    : dropdown.name

    const byVisibility = dropdown.visible
      ? { opacity: 1, pointerEvents: "visible" }
      : { opacity: 0, pointerEvents: "none" }

    return (
      <div className='dropdown' key={isUnique}>
        <button className='dropdown-button' onClick={() => openDropdown(dropdown.name)}>
          {dropdown.image}
        </button>

        <div className={`${dropdown.name}-list`} dropdown-list='true' style={byVisibility}>
          {dropdown.component}
        </div>
      </div>
    )
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
              {dropdowns.map(getDropDownDom)}
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
