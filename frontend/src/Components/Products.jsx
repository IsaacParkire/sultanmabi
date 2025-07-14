import { useRef, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Heart } from "lucide-react";

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

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      {/* Hero Section */}
      <div className="hero-section bg-[url('/images/meat-banner.jpg')]">
        <div className="container mx-auto relative z-10 text-center pt-32 pb-24">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Premium Meat Selection
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Finest cuts sourced from trusted local farms
          </p>
        </div>
      </div>

      {/* Category Sections */}
      <div className="container mx-auto py-12">
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
  const { cartItems, addToCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-20" id={category.id}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#000000]">
          {category.name}
        </h2>
        <div className="w-24 h-1 bg-[#D4AF37]"></div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-[#A31621]" />
        </button>
        
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide space-x-6 pb-8 px-2"
        >
          {category.products.map((product) => {
            const cartItem = cartItems.find(item => item.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            
            return (
              <ProductCard 
                key={product.id} 
                product={product} 
                quantity={quantity}
                addToCart={addToCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={() => toggleFavorite(product.id)}
              />
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-[#A31621]" />
        </button>
      </div>
    </section>
  );
}

function ProductCard({ 
  product, 
  quantity,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  isFavorite,
  toggleFavorite
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-80 bg-white rounded-xl shadow-artcaffe-sm hover:shadow-artcaffe-md transition-all overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite ? "text-[#A31621]" : "text-gray-400"
          } bg-white/80 backdrop-blur-sm`}
        >
          <Heart 
            className="w-5 h-5" 
            fill={isFavorite ? "#A31621" : "none"} 
          />
        </button>
        
        {quantity > 0 && (
          <div className="absolute top-3 left-3 bg-[#A31621] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {quantity}
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {product.weight}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-[#333333]">
            {product.name}
          </h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-[#666666] mb-4">{product.description}</p>

        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-[#A31621]">
            Ksh {product.price.toLocaleString()}
          </p>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementQuantity(product.id)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                -
              </button>
              <span className="font-medium w-6 text-center">{quantity}</span>
              <button
                onClick={() => incrementQuantity(product.id)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart({...product, quantity: 1})}
              className="flex items-center gap-2 bg-[#A31621] text-white px-4 py-2 rounded-lg hover:bg-[#8a1220] transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}