import React, {useState, useEffect, useContext} from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import AppDownload from './components/AppDownload/AppDownload';
import SearchResults from './components/SearchResults/SearchResults';
import { StoreContext } from './context/StoreContext';
import Shop from "./components/Shop/Shop";
import Wishlist from './components/Wishlist/Wishlist.jsx'
import Orders from "./pages/Orders/Orders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const { token } = useContext(StoreContext);
  const [navbarKey, setNavbarKey] = useState(0);
  useEffect(() => {
    setNavbarKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  }, [token]);
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
    <Navbar key={navbarKey} setShowLogin={setShowLogin} />
    {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path = '/cart' element= {<Cart/>}/>
        <Route path = '/order' element= {<PlaceOrder/>}/>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/app-download" element={<AppDownload />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
