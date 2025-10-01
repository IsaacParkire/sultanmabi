import { useRef, useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Sultanmabi Select product catalog
const categories = [
  {
    id: "marinated-meats",
    name: "Marinated Meats",
    products: [
      {
        id: "marinated-1",
        name: "Honey Garlic Chicken",
        description: "Tender chicken marinated in honey and garlic",
        image: "/images/marinated/honey-garlic-chicken.jpg",
        price: 1800,
        weight: "1kg",
      },
      {
        id: "marinated-2",
        name: "BBQ Beef Strips",
        description: "Smoky BBQ marinated beef strips",
        image: "/images/marinated/bbq-beef-strips.jpg",
        price: 2200,
        weight: "800g",
      },
      {
        id: "marinated-3",
        name: "Herb Crusted Lamb",
        description: "Lamb with Mediterranean herbs",
        image: "/images/marinated/herb-lamb.jpg",
        price: 2800,
        weight: "600g",
      }
    ]
  },
  {
    id: "bbq-packs",
    name: "BBQ Packs",
    products: [
      {
        id: "bbq-1",
        name: "Family BBQ Pack",
        description: "Complete BBQ selection for family gatherings",
        image: "/images/bbq/family-pack.jpg",
        price: 3500,
        weight: "2kg",
      },
      {
        id: "bbq-2",
        name: "Grill Selection",
        description: "Best cuts for grilling enthusiasts",
        image: "/images/bbq/grill.jpg",
        price: 4200,
        weight: "1.5kg",
      }
    ]
  },
  {
    id: "gourmet-sausages",
    name: "Gourmet Sausages",
    products: [
      {
        id: "gourmet-1",
        name: "Truffle Beef Sausages",
        description: "Beef sausages with truffle",
        image: "/images/gourmet/truffle-sausages.jpg",
        price: 2400,
        weight: "500g",
      },
      {
        id: "gourmet-2",
        name: "Herb & Wine Sausages",
        description: "Artisanal sausages with herbs and wine",
        image: "/images/gourmet/herb-wine-sausages.jpg",
        price: 2000,
        weight: "500g",
      }
    ]
  },
  {
    id: "value-bundles",
    name: "Value Bundles",
    products: [
      {
        id: "bundle-1",
        name: "Weekly Meat Bundle",
        description: "Complete week's meat selection",
        image: "/images/bundles/weekly-bundle.jpg",
        price: 5500,
        weight: "3kg",
      },
      {
        id: "bundle-2",
        name: "Executive Bundle",
        description: "Selection for special occasions",
        image: "/images/bundles/executive-bundle.jpg",
        price: 8000,
        weight: "4kg",
      }
    ]
  }
];

export default function SultanmabiSelect() {
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [showDescription, setShowDescription] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const toggleDescription = (id) => {
    setShowDescription(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">      {/* Compact Hero Section with Sultanmabi Select theme */}
      <div 
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/meat-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#102542]/90 to-[#1a3a5f]/90"></div>
        <div className="container mx-auto relative z-10 py-6 px-4">
          <div className="flex items-center justify-between">
            {/* Sultanmabi Select Logo - Left Side */}
            <div className="flex items-center">
              <img 
                src="/images/sultanlogo.jpg" 
                alt="Sultanmabi Select Logo"
                className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full mr-4"
              />
              <div>
                <motion.h1 
                  className="text-2xl md:text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Sultanmabi Select Collection
                </motion.h1>
                <motion.p 
                  className="text-sm md:text-base text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Exclusive handpicked selections for fine dining
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
                      ? 'bg-white text-[#102542]'
                      : 'bg-white/10 text-white/90 hover:bg-white/20'
                  }`}
                >
                  {category.name.split(' ')[0]}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>      {/* Category Navigation */}
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
                    ? 'bg-[#102542] text-white shadow-blue-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="container mx-auto py-8 px-4">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="w-16 h-1 bg-gray-200 rounded-full mt-1"></div>
                </div>
              </div>
              <div className="relative">
                <div className="flex overflow-x-auto scrollbar-hide space-x-5 pb-8 px-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="relative h-44 bg-gray-200 animate-pulse"></div>
                      <div className="p-4">
                        <div className="h-5 bg-gray-200 rounded w-4/5 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Sections */}
      {!isLoading && (
        <div className="container mx-auto py-8 px-4">
          {categories.map((category) => (
            <ProductsSection 
              key={category.id} 
              category={category} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              showDescription={showDescription}
              toggleDescription={toggleDescription}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsSection({ category, favorites, toggleFavorite, showDescription, toggleDescription }) {
  const scrollRef = useRef(null);
  const { addToCart, cartItems } = useContext(CartContext);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  
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
    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, []);

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
          <div className="w-16 h-1 bg-[#102542] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Floating arrows with hover effect */}
        <button
          onClick={() => scroll("left")}
          disabled={isAtStart}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
            isAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#102542] hover:text-white'
          }`}
          aria-label={`Scroll ${category.name} left`}
        >
          <ChevronLeft className="w-5 h-5 text-[#102542] hover:text-white" />
        </button>
        
        <button
          onClick={() => scroll("right")}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
            isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#102542] hover:text-white'
          }`}
          aria-label={`Scroll ${category.name} right`}
        >
          <ChevronRight className="w-5 h-5 text-[#102542] hover:text-white" />
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
              showDescription={showDescription[product.id] || false}
              toggleDescription={() => toggleDescription(product.id)}
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
  addToCart,
  showDescription,
  toggleDescription
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
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">Loading...</div>
          </div>
        )}
        
        {/* Product image */}
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
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            isFavorite ? "text-[#102542]" : "text-gray-400"
          } bg-white/80 backdrop-blur-sm shadow-sm`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={isFavorite ? "#102542" : "none"} 
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
            className="text-sm font-bold text-[#333333] cursor-pointer flex items-center justify-between"
            onClick={toggleDescription}
          >
            <span className="line-clamp-1 mr-1">{product.name}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showDescription ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </h3>
          {showDescription && (
            <p className="text-xs text-[#666666] mt-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-base font-bold text-[#102542]">
            Ksh {product.price.toLocaleString()}
          </p>
          
          {/* Add to Cart Button */}
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
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
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
            className="absolute top-0 left-0 right-0 bg-[#102542] text-white text-center py-1"
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
