import { useState } from "react";
import { Menu, ShoppingCart, Search, Sun, Moon, ChevronDown, ChevronUp, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const primaryColor = "text-[#A31621]";
  const bgColor = darkMode ? "bg-gray-900 text-white" : "bg-[#FCF7F8] text-black";
  const hoverColor = "hover:text-[#A31621] transition-colors duration-200";
  const dropdownBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition shadow-md ${bgColor}`}>
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="flex items-center cursor-pointer space-x-2">
          <Link to="/">
            <img src="/images/logo.jpeg" alt="Sultanmabi Logo" className="w-10 h-10 object-cover rounded-full" />
          </Link>
          <span className="text-2xl font-bold text-[#A31621]">Sultanmabi</span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium items-center">
          <Link to="/" className={`${hoverColor} cursor-pointer`}>Home</Link>
          <Link to="/products" className={`${hoverColor} cursor-pointer`}>Products</Link>

          {/* Categories Dropdown */}
          <div className="relative group" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
            <div onClick={() => setCategoriesOpen(!categoriesOpen)} className={`flex items-center cursor-pointer ${hoverColor}`}>
              Categories {categoriesOpen ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
            </div>

            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-8 left-0 w-64 ${dropdownBg} shadow-lg rounded-md p-4 space-y-3`}
                >
                  <h4 className="text-lg font-semibold mb-2 border-b pb-2">Our Categories</h4>
                  <Link to="/categories/fruits" className="block px-4 py-2 rounded hover:bg-[#fcecec]">Farmer's choice range</Link>
                  <Link to="/categories/vegetables" className="block px-4 py-2 rounded hover:bg-[#fcecec]">Choice meats</Link>
                  <Link to="/categories/bakery" className="block px-4 py-2 rounded hover:bg-[#fcecec]">Sultanmabi select</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact" className={`${hoverColor} cursor-pointer`}>Contact</Link>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="hidden md:flex items-center bg-gray-100 rounded px-2 py-1">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search..." className="outline-none bg-transparent ml-2 text-sm" />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className={`w-6 h-6 ${hoverColor}`} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A31621] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <User className={`w-6 h-6 cursor-pointer ${hoverColor}`} onClick={() => setUserMenuOpen(!userMenuOpen)} />
            {userMenuOpen && (
              <div className={`absolute right-0 mt-2 w-40 ${dropdownBg} shadow-lg rounded-md p-2 space-y-2`}>
                <Link to="/profile" onClick={() => setUserMenuOpen(false)} className={`${hoverColor} block`}>Profile</Link>
                <Link to="/login" onClick={() => setUserMenuOpen(false)} className={`${hoverColor} block`}>Login</Link>
                <Link to="/register" onClick={() => setUserMenuOpen(false)} className={`${hoverColor} block`}>Register</Link>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <div onClick={() => setDarkMode(!darkMode)} className="cursor-pointer hover:text-yellow-500">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </div>

          {/* Hamburger */}
          <Menu className="w-6 h-6 cursor-pointer md:hidden" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className={`md:hidden shadow-md ${bgColor}`}>
          <ul className="flex flex-col items-center py-4 space-y-4 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className={hoverColor}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className={hoverColor}>Products</Link>

            <div className="relative">
              <div onClick={() => setCategoriesOpen(!categoriesOpen)} className={`flex items-center cursor-pointer ${hoverColor}`}>
                Categories {categoriesOpen ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
              </div>
              {categoriesOpen && (
                <div className="bg-[#fcecec] p-4 rounded-md mt-2 space-y-2 text-black">
                  <Link to="/categories/fruits" onClick={() => setMenuOpen(false)} className="hover:text-[#A31621] block">Farmer's choice range</Link>
                  <Link to="/categories/vegetables" onClick={() => setMenuOpen(false)} className="hover:text-[#A31621] block">Choice meats</Link>
                  <Link to="/categories/bakery" onClick={() => setMenuOpen(false)} className="hover:text-[#A31621] block">Sultanmabi select</Link>
                </div>
              )}
            </div>

            <Link to="/contact" onClick={() => setMenuOpen(false)} className={hoverColor}>Contact</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className={hoverColor}>Cart</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Profile</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Register</Link>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}
