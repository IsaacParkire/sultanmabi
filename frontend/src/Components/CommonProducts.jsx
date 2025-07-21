// src/Components/CommonProducts.jsx
import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const meatProducts = [
  {
    id: 1,
    name: "Beef Ribeye",
    description: "Grass-fed, well-marbled",
    image: "/images/ribeye.jpg",
    price: 1800,
    weight: "500g"
  },
  {
    id: 2,
    name: "Pork Sausages",
    description: "Handcrafted premium",
    image: "/images/sausages.jpg",
    price: 1200,
    weight: "1kg"
  },
  {
    id: 3,
    name: "Chicken Breast",
    description: "Hormone-free fillets",
    image: "/images/chicken-breast.jpg",
    price: 850,
    weight: "1kg"
  },
  {
    id: 4,
    name: "Smoked Bacon",
    description: "Thick-cut applewood",
    image: "/images/bacon-strips.jpg",
    price: 950,
    weight: "500g"
  },
  {
    id: 5,
    name: "Lamb Chops",
    description: "New Zealand fresh",
    image: "/images/lamb-chops.jpg",
    price: 2200,
    weight: "800g"
  },
  {
    id: 6,
    name: "Beef Mince",
    description: "Lean ground beef",
    image: "/images/beef-mince.jpg",
    price: 750,
    weight: "500g"
  },
  {
    id: 7,
    name: "Pork Ribs",
    description: "Meaty BBQ ribs",
    image: "/images/pork-ribs.jpg",
    price: 1600,
    weight: "1kg"
  },
  {
    id: 8,
    name: "Turkey Breast",
    description: "Skinless, lean",
    image: "/images/turkey-breast.jpg",
    price: 1100,
    weight: "1kg"
  }
];

export default function CommonProducts() {
  const { addToCart, cartItems } = useCart();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  // Get quantity of product in cart
  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  // Format currency as Kenyan Shillings
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-12 px-4 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Premium Meat Selection</h2>
            <p className="text-gray-600">Our most popular cuts</p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center text-[#A31621] font-medium mt-2 md:mt-0"
          >
            View all products <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        {/* Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-50"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="w-5 h-5 text-[#A31621]" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-50"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="w-5 h-5 text-[#A31621]" />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
        >
          {meatProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              formatCurrency={formatCurrency}
              quantityInCart={getQuantity(product.id)}
              addToCart={() => addToCart({...product, quantity: 1})}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, formatCurrency, quantityInCart, addToCart }) {
  const [quantity, setQuantity] = useState(quantityInCart || 0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({...product, quantity: newQuantity});
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1000);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({...product, quantity: newQuantity});
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    if (newQuantity > 0) {
      addToCart({...product, quantity: newQuantity});
    }
  };

  return (
    <motion.div
      className="min-w-[160px] bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 relative"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-36">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-1">{product.description}</p>
        
        <div className="flex justify-between items-center mb-2">
          <p className="text-[#A31621] font-bold text-sm">
            {formatCurrency(product.price)}
          </p>
          <p className="text-gray-500 text-xs">{product.weight}</p>
        </div>

        {/* Cart Button with Quantity Counter */}
        <div className="flex justify-between items-center">
          {quantity > 0 ? (
            <div className="flex items-center border border-gray-300 rounded-full w-full">
              <button
                onClick={decrementQuantity}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full text-sm"
              >
                -
              </button>
              <span className="px-2 text-sm font-medium min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full text-sm"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#A31621] text-white py-1.5 rounded text-xs flex items-center justify-center hover:bg-[#8a1220]"
            >
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Added to Cart Feedback */}
      <AnimatePresence>
        {showFeedback && (
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