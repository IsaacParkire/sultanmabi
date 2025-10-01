import { useRef, useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Halal product catalog - all products removed
const categories = [
  {
    id: "continentals",
    name: "Continentals",
    products: []
  },
  {
    id: "delicatessen",
    name: "Delicatessen",
    products: []
  },
  {
    id: "cold-deli",
    name: "Cold Deli Products",
    products: []
  },
  {
    id: "beefcuts",
    name: "Beefcuts",
    products: []
  },
  {
    id: "lamb",
    name: "Lamb",
    products: []
  },
  {
    id: "pork",
    name: "Pork",
    products: []
  },
  {
    id: "chicken",
    name: "Chicken",
    products: []
  },
  {
    id: "bacon-packs",
    name: "Bacon Packs",
    products: []
  }
];

export default function ChoiceMeats() {
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* Compact Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1a5d1a] to-[#2d7a2d]">
        <div className="container mx-auto relative z-10 py-6 px-4">
          <div className="flex items-center justify-between">
            {/* Choice Meats Logo/Title - Left Side */}
            <div className="flex items-center">
              <div>
                <motion.h1 
                  className="text-2xl md:text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Choice Meats
                </motion.h1>
                <motion.p 
                  className="text-sm md:text-base text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  halal meat selection
                </motion.p>
              </div>
            </div>
            
            {/* Category Quick Nav - Right Side */}
            <motion.div 
              className="hidden md:flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {categories.slice(0, 4).map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-white text-[#1a5d1a]'
                      : 'bg-white/10 text-white/90 hover:bg-white/20'
                  }`}
                >
                  {category.name.split(' ')[0]}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/meat-pattern.svg')] bg-cover opacity-10"></div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-3 space-x-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#1a5d1a] text-white shadow-green-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div className="container mx-auto py-8 px-4">
        {categories.map((category) => (
          <ProductsSection 
            key={category.id} 
            category={category} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

function ProductsSection({ category, favorites, toggleFavorite }) {
  const scrollRef = useRef(null);
  const { addToCart, cartItems } = useContext(CartContext);
  
  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Scroll by 3 cards (each 224px) + gaps (2 * 20px)
      const scrollAmount = 3 * 224 + 2 * 20;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      className="mb-16" 
      id={category.id}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1a5d1a]">
            {category.name}
          </h2>
          <div className="w-16 h-1 bg-[#1a5d1a] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Products Carousel or Empty State */}
      {category.products.length > 0 ? (
        <div className="relative">
          {/* Floating arrows on the sides */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label={`Scroll ${category.name} left`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label={`Scroll ${category.name} right`}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-5 pb-8 px-1"
          >
            {category.products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={() => toggleFavorite(product.id)}
                quantityInCart={getQuantity(product.id)}
                addToCart={() => addToCart({...product, quantity: 1})}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No products available</h3>
          <p className="text-gray-500">Products for this category will be added soon.</p>
        </div>
      )}
    </section>
  );
}

function ProductCard({ 
  product, 
  isFavorite,
  toggleFavorite,
  quantityInCart,
  addToCart
}) {
  const [showCartFeedback, setShowCartFeedback] = useState(false);
  const [quantity, setQuantity] = useState(quantityInCart || 0);
  const [showDescription, setShowDescription] = useState(false);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({...product, quantity: newQuantity});
    setShowCartFeedback(true);
    setTimeout(() => setShowCartFeedback(false), 1000);
  };

  return (
    <motion.div
      className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 relative"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="relative h-44">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            isFavorite ? "text-[#1a5d1a]" : "text-gray-400"
          } bg-white/80 backdrop-blur-sm shadow-sm`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={isFavorite ? "#1a5d1a" : "none"} 
            strokeWidth={1.5}
          />
        </button>
        
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {product.weight}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 
            className="text-sm font-bold text-[#333333] line-clamp-1 cursor-pointer"
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
          >
            {product.name}
          </h3>
          {showDescription && (
            <p className="text-xs text-[#666666] mt-1 absolute bg-white p-2 rounded shadow-lg z-10 w-52">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-base font-bold text-[#1a5d1a]">
            Ksh {product.price.toLocaleString()}
          </p>
          
          {/* Add to Cart Button with Quantity Counter */}
          <div className="flex items-center">
            {quantity > 0 ? (
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                >
                  -
                </button>
                <span className="px-2 text-sm font-medium min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all bg-gray-100 text-[#1a5d1a] hover:bg-green-100"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cart Feedback Animation */}
      <AnimatePresence>
        {showCartFeedback && (
          <motion.div
            className="absolute top-0 left-0 right-0 bg-[#1a5d1a] text-white text-center py-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span className="text-xs font-medium">Added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}