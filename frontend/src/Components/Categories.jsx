// src/Components/Categories.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Star, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const mainCategories = [
  {
    name: "Farmer's Choice",
    path: "/farmers-choice",
    image: "/images/farmer.png",
    description: "Premium quality meats from Kenya's trusted brand",
    color: "#A31621", // Red theme
    subcategories: [
      { name: "Sausages", image: "/images/sausages.jpg", products: 24 },
      { name: "Bacon", image: "/images/bacon.jpg", products: 18 },
      { name: "Smokies", image: "/images/smokies.jpg", products: 15 },
      { name: "Beef", image: "/images/beef.jpg", products: 32 },
      { name: "Pork", image: "/images/pork.jpg", products: 22 },
      { name: "Chicken", image: "/images/chicken.jpg", products: 28 },
    ]
  },
  {
    name: "Choice Meats",
    path: "/choice-meats",
    image: "/images/choice.png",
    description: "Gourmet cuts for the discerning palate",
    color: "#4C7A34", // Green theme
    subcategories: [
      { name: "Premium Steaks", image: "/images/steaks.jpg", products: 16 },
      { name: "Ribs", image: "/images/ribs.jpg", products: 12 },
      { name: "Burgers", image: "/images/burgers.jpg", products: 20 },
      { name: "Minced Meat", image: "/images/minced.jpg", products: 15 },
      { name: "Lamb", image: "/images/lamb.jpg", products: 14 },
      { name: "Specialty Cuts", image: "/images/specialty.jpg", products: 18 },
    ]
  },
  {
    name: "Sultanmabi Select",
    path: "/sultanmabi-select",
    image: "/images/sultanlogo.jpg",
    description: "Exclusive handpicked selections for premium dining",
    color: "#102542", // Blue theme
    subcategories: [
      { name: "Marinated Meats", image: "/images/marinated.jpg", products: 22 },
      { name: "BBQ Packs", image: "/images/bbq.jpg", products: 15 },
      { name: "Gourmet Sausages", image: "/images/gourmet-sausages.jpg", products: 18 },
      { name: "Value Bundles", image: "/images/bundles.jpg", products: 25 },
      { name: "Organic Range", image: "/images/organic.jpg", products: 12 },
      { name: "Chef's Selection", image: "/images/chef.jpg", products: 16 },
    ]
  }
];

const featuredProducts = [
  { 
    id: 1,
    name: "Farmer's Choice Smokies Pack", 
    price: 1200, 
    image: "/images/smokies-pack.jpg",
    rating: 4.8,
    category: "Farmer's Choice",
    weight: "1kg Pack"
  },
  { 
    id: 2,
    name: "Choice Meats Ribeye Steak", 
    price: 1800, 
    image: "/images/ribeye.jpg",
    rating: 4.9,
    category: "Choice Meats",
    weight: "500g"
  },
  { 
    id: 3,
    name: "Sultanmabi Gourmet Sausages", 
    price: 1400, 
    image: "/images/gourmet-sausages.jpg",
    rating: 4.7,
    category: "Sultanmabi Select",
    weight: "800g Pack"
  },
  { 
    id: 4,
    name: "Farmer's Choice Bacon", 
    price: 850, 
    image: "/images/bacon-pack.jpg",
    rating: 4.6,
    category: "Farmer's Choice",
    weight: "500g"
  },
  { 
    id: 5,
    name: "Choice Meats Beef Burger Patties", 
    price: 950, 
    image: "/images/burger-patties.jpg",
    rating: 4.5,
    category: "Choice Meats",
    weight: "6 Pieces"
  },
  { 
    id: 6,
    name: "Sultanmabi Marinated Chicken Wings", 
    price: 750, 
    image: "/images/chicken-wings.jpg",
    rating: 4.8,
    category: "Sultanmabi Select",
    weight: "1kg"
  }
];

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const featuredProductsRef = useRef(null);
  const { addToCart } = useCart();

  // Format currency as Kenyan Shillings
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Scroll featured products horizontally
  const scrollFeatured = (direction) => {
    if (featuredProductsRef.current) {
      const scrollAmount = 300;
      featuredProductsRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#102542] to-[#1a3a5f] py-24">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Premium Meat Categories
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our premium selections from trusted brands
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {mainCategories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="h-48 relative overflow-hidden"
                  style={{ backgroundColor: category.color }}
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white text-center drop-shadow-lg">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {category.subcategories.length} Subcategories
                    </span>
                    <Link
                      to={category.path}
                      className="flex items-center text-[#A31621] font-medium"
                    >
                      Explore <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/meat-pattern.svg')] bg-cover opacity-10"></div>
      </div>

      {/* Subcategories Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {mainCategories[activeCategory].name} Selection
            </h2>
            <div 
              className="w-16 h-1 rounded-full mt-2"
              style={{ backgroundColor: mainCategories[activeCategory].color }}
            ></div>
          </div>
          <div className="flex space-x-2">
            {mainCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`w-3 h-3 rounded-full ${
                  activeCategory === index 
                    ? "bg-[#A31621]" 
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {mainCategories[activeCategory].subcategories.map((sub, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="h-40 relative overflow-hidden">
                <img 
                  src={sub.image} 
                  alt={sub.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#A31621] text-white px-2 py-1 rounded-full text-xs font-medium">
                  {sub.products} products
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{sub.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    From {formatCurrency(500)}
                  </span>
                  <button className="text-[#A31621] text-sm font-medium">
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gradient-to-br from-[#f8f8f8] to-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Customer favorites from our premium meat selection
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollFeatured('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#A31621]" />
            </button>
            
            <div 
              ref={featuredProductsRef}
              className="flex overflow-x-auto scrollbar-hide space-x-6 pb-8 px-2 snap-x snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0 w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 snap-center"
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredProduct(index)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        hoveredProduct === index ? "scale-110" : ""
                      }`}
                    />
                    <div 
                      className="absolute top-3 left-3 text-white px-2 py-1 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: 
                          product.category === "Farmer's Choice" ? "#A31621" : 
                          product.category === "Choice Meats" ? "#4C7A34" : 
                          "#102542"
                      }}
                    >
                      {product.category}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-xs font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{product.weight}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#A31621]">
                        {formatCurrency(product.price)}
                      </span>
                      <button 
                        className="bg-[#A31621] text-white p-2 rounded-full hover:bg-[#8a1220] transition-colors"
                        onClick={() => addToCart({
                          ...product,
                          quantity: 1
                        })}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button
              onClick={() => scrollFeatured('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#A31621]" />
            </button>
          </div>
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#102542] to-[#1a3a5f] rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-8 md:p-12 md:col-span-2 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <Tag className="text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-bold">SPECIAL OFFER</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get 20% Off Your First Order!
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl">
                Sign up now and receive an exclusive discount on your first meat purchase. 
                Premium quality at unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A31621]"
                />
                <button className="bg-[#A31621] hover:bg-[#8a1220] text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors">
                  Claim Discount
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/images/meat-banner.jpg" 
                alt="Meat Special Offer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied meat lovers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-yellow-400 fill-yellow-400" 
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The quality of meat from Sultanmabi Select is unmatched! Their marinated options save me so much time and taste incredible on the grill."
              </p>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-800">James Kimani</h4>
                  <p className="text-sm text-gray-500">Nairobi, Kenya</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;