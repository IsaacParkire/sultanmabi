import { useRef, useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Quick sell products - curated selection of popular items
const quickSellProducts = [
  {
    id: "qs-beef-cubes",
    name: "Beef Cubes 1kg",
    description: "Perfect for stews and slow cooking",
    image: "/images/FCL Fresh cuts/Beefcuts/Beefcubes1.png",
    price: 1200,
    weight: "1kg",
    tag: "BEST SELLER"
  },
  {
    id: "qs-chicken-sausage",
    name: "Chicken Sausage 1kg",
    description: "German-style chicken sausages",
    image: "/images/FCLSausagesPacks/ChickenSausage1Kg.png",
    price: 1450,
    weight: "1kg",
    tag: "POPULAR"
  },
  {
    id: "qs-beef-polony",
    name: "Beef Polony 200g",
    description: "Quality beef polony",
    image: "/images/continentals/Polony200g.png",
    price: 250,
    weight: "200g",
    tag: "QUICK BUY"
  },
  {
    id: "qs-garlic-salami",
    name: "Garlic Salami 200g",
    description: "Quality garlic salami",
    image: "/images/continentals/GarlicSalami.png",
    price: 350,
    weight: "200g",
    tag: "NEW"
  },
  {
    id: "qs-beef-ribs",
    name: "Beef Ribs 500g",
    description: "Rich and flavorful ribs",
    image: "/images/FCL Fresh cuts/Beefcuts/BeefRibs.png",
    price: 1100,
    weight: "500g",
    tag: "BBQ SPECIAL"
  },
  {
    id: "qs-boerewors",
    name: "Boerewors 500g",
    description: "Traditional South African sausage",
    image: "/images/FCLSausagesPacks/Boerewors500g.png",
    price: 1400,
    weight: "500g",
    tag: "WEEKEND DEAL"
  }
];

export default function QuickSell() {
  const scrollRef = useRef(null);
  const { addToCart, cartItems } = useContext(CartContext);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Get quantity of product in cart
  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 10);
  };

  // Scroll handler
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 3 * 224 + 2 * 20; // 3 cards width + gaps
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Handle scroll events
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Initial check
    
    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-[#102542] mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Quick Sell
              <span className="ml-3 text-sm font-normal bg-[#A31621] text-white py-1 px-3 rounded-full">
                Fast Pick-ups
              </span>
            </motion.h2>
            <motion.p 
              className="text-[#102542]/70 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Popular items ready for immediate pickup or delivery
            </motion.p>
            <div className="w-16 h-1 bg-[#A31621] rounded-full mt-2"></div>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Floating arrows with hover effect */}
          <button
            onClick={() => scroll("left")}
            disabled={isAtStart}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
              isAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white'
            }`}
            aria-label="Scroll Quick Sell products left"
          >
            <ChevronLeft className="w-5 h-5 text-[#A31621] hover:text-white" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            disabled={isAtEnd}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
              isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white'
            }`}
            aria-label="Scroll Quick Sell products right"
          >
            <ChevronRight className="w-5 h-5 text-[#A31621] hover:text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-5 pb-8 px-1"
          >
            {quickSellProducts.map((product) => (
              <QuickSellCard 
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
      </div>
    </section>
  );
}

function QuickSellCard({ 
  product, 
  isFavorite,
  toggleFavorite,
  quantityInCart,
  addToCart
}) {
  const [showCartFeedback, setShowCartFeedback] = useState(false);
  const [quantity, setQuantity] = useState(quantityInCart || 0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({...product, quantity: newQuantity});
    setShowCartFeedback(true);
    setTimeout(() => setShowCartFeedback(false), 1000);
  };

  return (
    <motion.div
      className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 relative group"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="relative h-44">
        {/* Loading placeholder with shimmer effect */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer flex items-center justify-center">
            <div className="text-gray-400 text-xs">Loading...</div>
          </div>
        )}
        
        {/* Product image */}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">No image</span>
            </div>
          </div>
        )}
        
        {/* Product tag */}
        {product.tag && (
          <div className="absolute top-2 right-2 bg-[#A31621] text-white px-2 py-1 rounded text-xs font-bold">
            {product.tag}
          </div>
        )}
        
        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 left-2 p-1.5 rounded-full ${
            isFavorite ? "text-[#A31621]" : "text-gray-400"
          } bg-white/80 backdrop-blur-sm shadow-sm`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={isFavorite ? "#A31621" : "none"} 
            strokeWidth={1.5}
          />
        </button>
        
        {/* Weight badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {product.weight}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-sm font-bold text-[#333333] line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#666666] mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-base font-bold text-[#A31621]">
            Ksh {product.price.toLocaleString()}
          </p>
          
          {/* Add to Cart Button - exact same as Farmer's Choice */}
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
