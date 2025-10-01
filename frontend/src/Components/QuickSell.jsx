import { useRef, useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Clock } from "lucide-react";

// Quick sell products - featured items for fast purchase
const quickSellProducts = [
  {
    id: "quick-1",
    name: "Beef Mince 500g",
    description: "Fresh ground beef perfect for burgers",
    image: "/images/FCL Fresh cuts/Beefcuts/beefcubes.png",
    price: 650,
    weight: "500g",
    originalPrice: 750,
    discount: 13,
    badge: "Best Seller"
  },
  {
    id: "quick-2",
    name: "Chicken Breast 1kg",
    description: "Tender boneless chicken breast",
    image: "/images/continentals/PoultryViennas250g.png",
    price: 890,
    weight: "1kg",
    originalPrice: 1050,
    discount: 15,
    badge: "Fresh Today"
  },
  {
    id: "quick-3",
    name: "Beef Sausages 400g",
    description: "Juicy beef sausages",
    image: "/images/FCLSausagesPacks/MeatyBeefSausages400g.png",
    price: 420,
    weight: "400g",
    originalPrice: 480,
    discount: 12,
    badge: "Quick Cook"
  },
  {
    id: "quick-4",
    name: "Pork Chops 600g",
    description: "Tender pork chops",
    image: "/images/FCL Fresh cuts/Beefcuts/T-boneSteak.png",
    price: 780,
    weight: "600g",
    originalPrice: 920,
    discount: 15,
    badge: "Limited"
  },
  {
    id: "quick-5",
    name: "Lamb Stew 800g",
    description: "Perfect for slow cooking",
    image: "/images/FCL Fresh cuts/LAMB/LambCasserole.png",
    price: 1200,
    weight: "800g",
    originalPrice: 1400,
    discount: 14,
    badge: "Weekend Special"
  },
  {
    id: "quick-6",
    name: "Fish Fillet 500g",
    description: "Fresh fish fillet",
    image: "/images/continentals/BeefViennas500gms.png",
    price: 950,
    weight: "500g",
    originalPrice: 1100,
    discount: 14,
    badge: "Ocean Fresh"
  },
  {
    id: "quick-7",
    name: "Turkey Mince 500g",
    description: "Lean turkey mince",
    image: "/images/FCL Fresh cuts/Beefcuts/BeefFillet.png",
    price: 720,
    weight: "500g",
    originalPrice: 850,
    discount: 15,
    badge: "Healthy Choice"
  },
  {
    id: "quick-8",
    name: "Beef Ribs 1kg",
    description: "Meaty beef ribs for BBQ",
    image: "/images/FCL Fresh cuts/Beefcuts/BeefRibs.png",
    price: 1150,
    weight: "1kg",
    originalPrice: 1350,
    discount: 15,
    badge: "BBQ Ready"
  }
];

export default function QuickSell() {
  const scrollRef = useRef(null);
  const { addToCart, cartItems } = useContext(CartContext);
  const [favorites, setFavorites] = useState([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    
    const scrollAmount = 3 * 280 + 2 * 20; // 3 cards width + gaps
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
    <section className="py-16 bg-gradient-to-br from-[#FCF7F8] to-[#F8F0F1]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-4"
          >
            <div className="flex items-center bg-[#A31621] text-white px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-bold">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-[#102542]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Quick <span className="text-[#A31621]">Sell</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-[#102542]/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Flash deals on premium meats - Limited time offers with amazing discounts!
          </motion.p>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Floating arrows */}
          <button
            onClick={() => scroll("left")}
            disabled={isAtStart}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-all ${
              isAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white hover:scale-110'
            }`}
            aria-label="Scroll quick sell products left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            disabled={isAtEnd}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-all ${
              isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white hover:scale-110'
            }`}
            aria-label="Scroll quick sell products right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-8 px-1"
          >
            {quickSellProducts.map((product, index) => (
              <QuickSellCard 
                key={product.id}
                product={product}
                index={index}
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={() => toggleFavorite(product.id)}
                quantityInCart={getQuantity(product.id)}
                addToCart={() => addToCart({...product, quantity: 1})}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="bg-[#A31621] hover:bg-[#8a121c] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            View All Quick Deals
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function QuickSellCard({ 
  product, 
  index,
  isFavorite,
  toggleFavorite,
  quantityInCart,
  addToCart
}) {
  const [showCartFeedback, setShowCartFeedback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart();
    setShowCartFeedback(true);
    setTimeout(() => setShowCartFeedback(false), 1500);
  };

  return (    <motion.div
      className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-[#A31621] text-white text-xs font-bold px-3 py-1 rounded-full">
          {product.badge}
        </span>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-3 right-3 z-20">
        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </span>
      </div>

      {/* Product Image */}
      <div className="relative h-48">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">Loading...</div>
          </div>
        )}
        
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image not available</span>
          </div>
        )}
        
        <button
          onClick={toggleFavorite}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${
            isFavorite ? "bg-[#A31621] text-white" : "bg-white/80 text-gray-600 hover:bg-white"
          } backdrop-blur-sm shadow-md`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={isFavorite ? "currentColor" : "none"} 
          />
        </button>
        
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {product.weight}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#102542] mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-[#102542]/70 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#A31621]">
                Ksh {product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                Ksh {product.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-green-600 font-medium">
              Save Ksh {(product.originalPrice - product.price).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#A31621] hover:bg-[#8a121c] text-white py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Quick Add</span>
          {quantityInCart > 0 && (
            <span className="bg-white text-[#A31621] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {quantityInCart}
            </span>
          )}
        </button>
      </div>

      {/* Cart Feedback Animation */}
      <AnimatePresence>
        {showCartFeedback && (
          <motion.div
            className="absolute inset-0 bg-green-500/90 flex items-center justify-center rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2"
              >
                <ShoppingCart className="w-6 h-6 text-green-500" />
              </motion.div>
              <p className="font-bold">Added to Cart!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
