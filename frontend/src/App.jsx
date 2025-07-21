// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Products from "./Components/Products";
import CartPage from "./Components/CartPage";
import Categories from "./Components/Categories";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Testimonials from "./Components/Testimonials";
import Newsletter from "./Components/Newsletter";
import Services from "./Components/Services";
import CommonProducts from "./Components/CommonProducts";
import FarmersChoice from "./Components/Farmerschoice";
import ChoiceMeats from "./Components/Choicemeats";
import About from "./Components/Abouthome";
import { CartProvider } from "./context/CartContext"; // ✅ Import this
import Checkout from "./Components/Checkout";

export default function App() {
  return (
    <CartProvider> {/* ✅ Wrap everything inside this */}
      <Router>
        <div className="pt-20">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/farmers-choice" element={<FarmersChoice />} />
            <Route path="/choice-meats" element={<ChoiceMeats />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

          {/* Shared sections */}
          <CommonProducts />
          <Services />
          <Newsletter />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
