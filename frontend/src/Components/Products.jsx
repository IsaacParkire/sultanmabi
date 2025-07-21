import { useRef, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";

// Sample data generator for 15 products per category
const generateProducts = (category, count = 15) => {
  const products = [];
  const categoryPrefixes = {
    "Farmer's Choice Range": ["Premium", "Organic", "Heritage"],
    "Sultanmabi Select": ["Sultanmabi", "Exclusive", "Signature"],
    "Choice Meats": ["Choice", "Select", "Prime"],
    "Pork": ["Pork", "Bacon", "Ham"],
    "Beef": ["Beef", "Steak", "Ribeye"],
    "Processed": ["Gourmet", "Artisan", "Smoked"],
    "Seafood": ["Wild", "Fresh", "Ocean"],
    "Poultry": ["Free-Range", "Jumbo", "Organic"]
  };

  const prefixes = categoryPrefixes[category] || ["Premium"];
  
  for (let i = 1; i <= count; i++) {
    products.push({
      id: `${category}-${i}`,
      name: `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${category.split(' ')[0]} Product ${i}`,
      price: Math.floor(Math.random() * 2000) + 500,
      image: `/images/${category.toLowerCase().replace(/\s+/g, '-')}-${i}.jpg`,
      rating: (Math.random() * 0.5 + 4.5).toFixed(1),
      description: `High-quality ${category} product with exceptional flavor`,
      weight: `${Math.floor(Math.random() * 1000) + 200}g`
    });
  }
  return products;
};

const categories = [
  { id: "farmers-choice", name: "Farmer's Choice Range" },
  { id: "sultanmabi-select", name: "Sultanmabi Select" },
  { id: "choice-meats", name: "Choice Meats" },
  { id: "pork", name: "Pork Specialties" },
  { id: "beef", name: "Beef Selection" },
  { id: "processed", name: "Processed Meats" },
  { id: "seafood", name: "Fresh Seafood" },
  { id: "poultry", name: "Poultry Selection" }
].map(category => ({
  ...category,
  products: generateProducts(category.name)
}));

export default function ProductsPage() {
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
      {/* Modern Hero Section */}
      <div className="relative bg-gradient-to-r from-[#102542] to-[#1a3a5f]">
        <div className="container mx-auto relative z-10 text-center pt-24 pb-20 px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Premium Meat Selection
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Finest cuts sourced from trusted local farms
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {categories.slice(0, 5).map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#A31621] text-white'
                    : 'bg-white/10 text-white/90 hover:bg-white/20'
                }`}
              >
                {category.name.split(' ')[0]}
              </button>
            ))}
          </motion.div>
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
                    ? 'bg-[#A31621] text-white shadow-red-sm'
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
  
  // Get quantity of product in cart
  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Increased scroll amount for quick motion
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
          <h2 className="text-2xl font-bold text-[#102542]">
            {category.name}
          </h2>
          <div className="w-16 h-1 bg-[#A31621] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Products Carousel */}
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
            isFavorite ? "text-[#A31621]" : "text-gray-400"
          } bg-white/80 backdrop-blur-sm shadow-sm`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={isFavorite ? "#A31621" : "none"} 
            strokeWidth={1.5}
          />
        </button>
        
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {product.weight}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-[#333333] line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded text-xs">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{product.rating}</span>
          </div>
        </div>

        <p className="text-xs text-[#666666] mb-3 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <p className="text-base font-bold text-[#A31621]">
            Ksh {product.price.toLocaleString()}
          </p>
          
          {/* Updated Add to Cart Button with Quantity Counter */}
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
                className="flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all bg-gray-100 text-red-700 hover:bg-red-100"
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
            className="absolute top-0 left-0 right-0 bg-[#A31621] text-white text-center py-1"
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