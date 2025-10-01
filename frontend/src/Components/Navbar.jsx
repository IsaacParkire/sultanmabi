import { useState } from "react";
import { Menu, ShoppingCart, Search, ChevronDown, ChevronUp, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Madder color (A31621) for navbar background
  const primaryColor = "text-[#A31621]";
  const bgColor = "bg-[#A31621]";
  const textColor = "text-white";
  const hoverColor = "hover:text-[#FFD8A9]";
  const dropdownBg = "bg-white text-black";

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false);
      setShowMobileSearch(false);
    }
  };

  return (    <nav className={`fixed top-0 left-0 w-full z-50 transition shadow-md ${bgColor} ${textColor}`}>
      <div className="flex justify-between items-center px-4 md:px-6 py-2 max-w-7xl mx-auto">

        {/* Logo - made clickable to homepage */}        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="flex items-center cursor-pointer space-x-1"
        >          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img 
              src="/images/whitelogo.png" 
              alt="Sultanmabi Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
          </Link>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-lg md:text-xl font-bold text-white hidden sm:block ml-1">Sultanmabi Market</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium items-center">
          <Link to="/" className={`${hoverColor} cursor-pointer transition-colors`}>Home</Link>
          <Link to="/products" className={`${hoverColor} cursor-pointer transition-colors`}>Products</Link>

          {/* Categories Dropdown */}
          <div className="relative group" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
            <div onClick={() => setCategoriesOpen(!categoriesOpen)} className={`flex items-center cursor-pointer ${hoverColor} transition-colors`}>
              Categories {categoriesOpen ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
            </div>

            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-8 left-0 w-64 ${dropdownBg} shadow-lg rounded-md p-4 space-y-3 border border-gray-200`}
                >                  <h4 className="text-lg font-semibold mb-2 border-b pb-2">Our Categories</h4>                  <Link to="/farmers-choice" className="block px-4 py-2 rounded hover:bg-[#fcecec] transition-colors">Farmer's choice range</Link>
                  <Link to="/choice-meats" className="block px-4 py-2 rounded hover:bg-[#fcecec] transition-colors">Choice meats</Link>
                  <Link to="/sultanmabi-select" className="block px-4 py-2 rounded hover:bg-[#fcecec] transition-colors">Sultanmabi select</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact" className={`${hoverColor} cursor-pointer transition-colors`}>Contact</Link>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}                className="py-1 pl-3 pr-10 rounded-full outline-none transition-all duration-300 bg-[#d14a52] text-white placeholder-[#FFD8A9] w-48 focus:w-56"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-[#FFD8A9]" />
              </button>
            </div>
          </form>

          {/* Mobile Search Toggle */}
          <div className="md:hidden cursor-pointer" onClick={() => setShowMobileSearch(!showMobileSearch)}>
            {showMobileSearch ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className={`w-6 h-6 ${hoverColor} transition-colors`} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <User 
              className={`w-6 h-6 cursor-pointer ${hoverColor} transition-colors`} 
              onClick={() => setUserMenuOpen(!userMenuOpen)} 
            />
            {userMenuOpen && (
              <div 
                className={`absolute right-0 mt-2 w-40 ${dropdownBg} shadow-lg rounded-md p-2 space-y-2 border border-gray-200`}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <Link to="/profile" onClick={() => setUserMenuOpen(false)} className={`${hoverColor} block px-3 py-2 rounded transition-colors`}>Profile</Link>
                <Link to="/login" onClick={() => setUserMenuOpen(false)} className={`${hoverColor} block px-3 py-2 rounded transition-colors`}>Login</Link>
                <Link to="/register" onClick={() => setUserMenuOpen(false)} className={`${hoverColor} block px-3 py-2 rounded transition-colors`}>Register</Link>
              </div>
            )}          </div>

          {/* Hamburger */}
          <Menu className="w-6 h-6 cursor-pointer md:hidden" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-4 py-3 bg-[#8c1219]">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 pl-3 pr-10 rounded-full outline-none w-full bg-[#d14a52] text-white placeholder-[#FFD8A9]"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-[#FFD8A9]" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`md:hidden shadow-md ${bgColor} ${textColor}`}
        >
          <ul className="flex flex-col items-center py-4 space-y-4 font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className={`${hoverColor} transition-colors`}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className={`${hoverColor} transition-colors`}>Products</Link>

            <div className="relative">
              <div onClick={() => setCategoriesOpen(!categoriesOpen)} className={`flex items-center cursor-pointer ${hoverColor} transition-colors`}>
                Categories {categoriesOpen ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
              </div>              {categoriesOpen && (                <div className="p-4 rounded-md mt-2 space-y-2 bg-[#d14a52]">
                  <Link to="/farmers-choice" onClick={() => setMenuOpen(false)} className="block hover:opacity-80 transition-opacity">Farmer's choice range</Link>
                  <Link to="/choice-meats" onClick={() => setMenuOpen(false)} className="block hover:opacity-80 transition-opacity">Choice meats</Link>
                  <Link to="/sultanmabi-select" onClick={() => setMenuOpen(false)} className="block hover:opacity-80 transition-opacity">Sultanmabi select</Link>
                </div>
              )}
            </div>

            <Link to="/contact" onClick={() => setMenuOpen(false)} className={`${hoverColor} transition-colors`}>Contact</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className={`${hoverColor} transition-colors`}>Cart</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className={`${hoverColor} transition-colors`}>Profile</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className={`${hoverColor} transition-colors`}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className={`${hoverColor} transition-colors`}>Register</Link>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}