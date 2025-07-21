// src/Components/Hero.jsx
import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const slides = [
  {
    id: 1,
    image: "/images/backslide1.jpg",
    foregroundImage: "/images/smokie-gr.jpg",
    headline: "Grill-Ready Smokies, Boldly Flavored",
    subtext: "Bursting with smoky goodness and grilled perfection, these sausages are a must-have for every meal and celebration.",
    cta: "Shop Smokies",
    link: "/products/smokies",
    badge: "Crowd Favorite",
    badgeColor: "#A31621",
    highlight: "🔥 Buy 3 packs, get 1 FREE!",
    productFeatures: [
      "Perfectly spiced blend",
      "Juicy with every bite",
      "Ready in 10 minutes"
    ]
  },
  {
    id: 2,
    image: "/images/bacon-hero.jpg",
    foregroundImage: "/images/bacon-pkg.png",
    headline: "Crispy, Smoky Bacon Perfection",
    subtext: "Our premium bacon is dry-cured and smoked to perfection. Perfect for breakfast or adding flavor to any dish.",
    cta: "Get Bacon",
    link: "/products/bacon",
    badge: "New Recipe",
    badgeColor: "#8C5E58",
    highlight: "🔥 Limited time: 25% off all bacon",
    productFeatures: [
      "Dry-cured for rich flavor",
      "Extra thick slices",
      "Minimal shrinkage when cooked"
    ]
  },
  {
    id: 3,
    image: "/images/sausages-hero.jpg",
    foregroundImage: "/images/sausages-pkg.png",
    headline: "Gourmet Sausages for Every Occasion",
    subtext: "Handcrafted with the finest cuts of meat and a blend of spices. From breakfast links to dinner bratwurst.",
    cta: "Explore Sausages",
    link: "/products/sausages",
    badge: "Best Seller",
    badgeColor: "#102542",
    highlight: "🔥 Free delivery on orders over KSh 2000",
    productFeatures: [
      "Handcrafted daily",
      "4 delicious varieties",
      "Perfect for grilling or frying"
    ]
  },
  {
    id: 4,
    image: "/images/farmers-choice-hero.jpg",
    foregroundImage: "/images/fc-range.png",
    headline: "Farmers Choice: Quality You Can Trust",
    subtext: "Discover our full range of Farmers Choice products, known for their consistent quality and delicious taste.",
    cta: "View Range",
    link: "/brands/farmers-choice",
    badge: "Kenya's Favorite",
    badgeColor: "#4C7A34",
    highlight: "🔥 Special bundle deals available",
    productFeatures: [
      "Locally produced",
      "Consistent quality",
      "Wide variety of products"
    ]
  },
  {
    id: 5,
    image: "/images/choice-meat-hero.jpg",
    foregroundImage: "/images/cm-range.png",
    headline: "Choice Meat: Premium Cuts for Discerning Palates",
    subtext: "Indulge in our premium meat selection, carefully sourced and expertly prepared for your table.",
    cta: "Shop Choice Meat",
    link: "/brands/choice-meat",
    badge: "Premium Quality",
    badgeColor: "#C41E3D",
    highlight: "🔥 Butcher's special cuts available",
    productFeatures: [
      "Aged for tenderness",
      "Expertly trimmed",
      "Vacuum-sealed freshness"
    ]
  },
  {
    id: 6,
    image: "/images/sultanmabi-hero.jpg",
    foregroundImage: "/images/sm-logo.png",
    headline: "Sultanmabi: Your Trusted Meat Partner",
    subtext: "From farm to fork, we deliver the finest meats with a commitment to quality and sustainability.",
    cta: "Learn About Us",
    link: "/about",
    badge: "Est. 2005",
    badgeColor: "#8C5E58",
    highlight: "🔥 Join our loyalty program today!",
    productFeatures: [
      "Ethically sourced",
      "Fast, reliable delivery",
      "100% satisfaction guarantee"
    ]
  }
];

const offerProducts = [
  {
    id: 1,
    name: "Smokies Pack",
    price: "KSh 1,200",
    discount: "KSh 1,500",
    image: "/images/smokies-offer.jpg",
    tag: "Special Deal"
  },
  {
    id: 2,
    name: "Premium Bacon",
    price: "KSh 850",
    discount: "KSh 1,000",
    image: "/images/bacon-offer.jpg",
    tag: "25% OFF"
  },
  {
    id: 3,
    name: "Sausage Variety",
    price: "KSh 1,100",
    discount: "KSh 1,400",
    image: "/images/sausages-offer.jpg",
    tag: "Best Seller"
  },
  {
    id: 4,
    name: "Beef Steaks",
    price: "KSh 1,800",
    image: "/images/steak-offer.jpg",
    tag: "New"
  },
  {
    id: 5,
    name: "Chicken Wings",
    price: "KSh 900",
    discount: "KSh 1,100",
    image: "/images/wings-offer.jpg",
    tag: "Family Pack"
  },
  {
    id: 6,
    name: "Minced Meat",
    price: "KSh 750",
    image: "/images/minced-offer.jpg",
    tag: "Quick Meal"
  },
  {
    id: 7,
    name: "Pork Ribs",
    price: "KSh 1,600",
    discount: "KSh 1,900",
    image: "/images/ribs-offer.jpg",
    tag: "Chef's Choice"
  },
  {
    id: 8,
    name: "Beef Burgers",
    price: "KSh 950",
    image: "/images/burgers-offer.jpg",
    tag: "Grill Ready"
  }
];

export default function Hero() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const productsRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Enhanced logo animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: [0, -15, 0],
      transition: { 
        duration: 1.5,
        delay: 0.3,
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut"
        }
      }
    },
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, 0],
      transition: { 
        duration: 0.8,
        times: [0, 0.25, 0.75, 1],
        repeat: Infinity,
        repeatType: "loop"
      }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.2 } 
    }
  };

  // Handle slide change with animation
  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Next slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Previous slide
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Variants for slide animation
  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 } 
    }
  };

  // Scroll product offers horizontally - FASTER SCROLLING
  const scrollProducts = (direction) => {
    if (productsRef.current) {
      const scrollAmount = 500; // Increased from 300 to 500 for faster scrolling
      const newPosition = direction === 'right' 
        ? scrollPosition + scrollAmount 
        : scrollPosition - scrollAmount;
      
      productsRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };

  // Update scroll position on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (productsRef.current) {
        setScrollPosition(productsRef.current.scrollLeft);
      }
    };
    
    if (productsRef.current) {
      productsRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (productsRef.current) {
          productsRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  return (
    <section 
      className="relative w-full py-8 px-4 overflow-hidden"
      id="home"
      style={{ 
        backgroundColor: "#FCF7F8",
        backgroundImage: "radial-gradient(rgba(163, 22, 33, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10 pt-12">
        {/* Animated Slogan */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ 
              color: "#102542",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            MEAT-ING YOUR <span style={{ color: "#A31621" }}>EXPECTATIONS</span>
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ backgroundColor: "#A31621" }}
          ></motion.div>
        </motion.div>
        
        {/* Slimmer Marketing Carousel */}
        <div 
          className="relative rounded-2xl overflow-hidden mb-10"
          style={{ 
            boxShadow: "0 20px 50px rgba(16, 37, 66, 0.15)"
          }}
        >
          {/* Brand Logos - REMOVED WHITE HOLDER AND ENLARGED */}
          <div className="absolute top-6 left-6 z-30">
            <Link to="/farmers-choice">
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="cursor-pointer"
              >
                <img 
                  src="/images/farmer.png" 
                  alt="Farmers Choice" 
                  className="w-24 h-24 object-contain drop-shadow-lg" // Enlarged from w-14 h-14
                />
              </motion.div>
            </Link>
          </div>
          
          <div className="absolute top-6 right-6 z-30">
            <Link to="/choice-meats">
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="cursor-pointer"
              >
                <img 
                  src="/images/choice.png" 
                  alt="Choice Meats" 
                  className="w-24 h-24 object-contain drop-shadow-lg" // Enlarged from w-14 h-14
                />
              </motion.div>
            </Link>
          </div>

          {/* Slides Container */}
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Background Image with Enhanced Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${slides[currentSlide].image})`,
                    filter: "brightness(0.8)"
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: "linear-gradient(90deg, rgba(16, 37, 66, 0.6) 0%, rgba(16, 37, 66, 0.3) 100%)" 
                    }}
                  />
                </div>

                {/* Foreground Product Image with Floating Animation */}
                {slides[currentSlide].foregroundImage && (
                  <motion.div
                    className="absolute bottom-0 right-0 w-1/2 md:w-1/3 h-3/4 z-20"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      y: [0, -10, 0],
                      transition: { 
                        x: { delay: 0.3, duration: 0.5 },
                        y: { 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }
                      }
                    }}
                  >
                    <img 
                      src={slides[currentSlide].foregroundImage}
                      alt="Premium Product"
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                )}

                {/* Text Content Card with Enhanced Styling */}
                <motion.div 
                  className="absolute bottom-6 left-6 p-6 rounded-2xl max-w-lg z-10 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: "rgba(252, 247, 248, 0.85)",
                    border: "2px solid rgba(163, 22, 33, 0.2)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Animated Badge with Pulse Effect */}
                  <motion.div 
                    className="absolute -top-3 left-6 py-1 px-3 rounded-full font-bold text-white text-sm"
                    style={{ 
                      backgroundColor: slides[currentSlide].badgeColor,
                      boxShadow: "0 3px 8px rgba(163, 22, 33, 0.4)"
                    }}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      rotate: [0, 5, -5, 0],
                      transition: { 
                        scale: { delay: 0.3, type: "spring" },
                        rotate: { delay: 0.5, duration: 0.6 }
                      }
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {slides[currentSlide].badge}
                  </motion.div>

                  <motion.h2 
                    className="text-2xl md:text-3xl font-bold mb-3"
                    style={{ 
                      color: "#102542",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.05)"
                    }}
                    variants={contentVariants}
                  >
                    {slides[currentSlide].headline}
                  </motion.h2>

                  <motion.p 
                    className="text-base mb-4 max-w-md"
                    style={{ 
                      color: "#102542",
                      opacity: 0.95,
                      lineHeight: "1.5"
                    }}
                    variants={contentVariants}
                  >
                    {slides[currentSlide].subtext}
                  </motion.p>

                  {/* Product Features List */}
                  {slides[currentSlide].productFeatures && (
                    <motion.ul 
                      className="mb-4 space-y-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {slides[currentSlide].productFeatures.map((feature, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-center text-sm"
                          initial={{ x: -15 }}
                          animate={{ x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <svg 
                            className="w-4 h-4 mr-2 flex-shrink-0" 
                            fill="#A31621" 
                            viewBox="0 0 20 20"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                          <span style={{ color: "#102542" }}>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}

                  {/* Promotion Highlight with Fire Icon */}
                  <motion.div 
                    className="mb-4 flex items-center bg-red-50 rounded-lg p-2 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <svg 
                      className="w-5 h-5 mr-2 animate-pulse" 
                      fill="#FF6B00" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" 
                      />
                    </svg>
                    <span 
                      className="font-bold"
                      style={{ color: "#A31621" }}
                    >
                      {slides[currentSlide].highlight}
                    </span>
                  </motion.div>

                  {/* CTA Button with Enhanced Hover */}
                  <motion.div 
                    variants={contentVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={slides[currentSlide].link}
                      className="inline-flex items-center font-bold px-6 py-3 rounded-full text-base transition-all duration-300"
                      style={{ 
                        backgroundColor: "#A31621", 
                        color: "#FCF7F8",
                        boxShadow: "0 4px 15px rgba(163, 22, 33, 0.5)"
                      }}
                    >
                      {slides[currentSlide].cta}
                      <svg 
                        className="w-4 h-4 ml-2" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "scale-125" : "opacity-60"
                  }`}
                  style={{ 
                    backgroundColor: index === currentSlide ? "#A31621" : "#102542" 
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Product Offers Carousel - SMALLER CARDS */}
        <div className="mt-10 mb-12 relative">
          <div className="flex items-center justify-between mb-6 px-4">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#102542" }}>
              Today's Special Offers
              <span className="ml-3 text-sm font-normal bg-red-100 text-red-800 py-1 px-2 rounded-full">
                Limited Time Only
              </span>
            </h2>
          </div>
          
          <div className="relative">
            {/* Left Navigation Arrow */}
            <button 
              onClick={() => scrollProducts('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll products left"
              style={{ display: scrollPosition > 0 ? 'flex' : 'none' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#102542">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Product Carousel */}
            <div 
              ref={productsRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 pb-6 px-2 snap-x snap-mandatory"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth'
              }}
            >
              {offerProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  className="flex-shrink-0 w-52 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 snap-center"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-36 object-cover"
                    />
                    {product.tag && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white" 
                           style={{ 
                             backgroundColor: "#A31621",
                             boxShadow: "0 2px 6px rgba(163, 22, 33, 0.4)"
                           }}>
                        {product.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 text-base mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold" style={{ color: "#102542" }}>
                        {product.price}
                      </span>
                      {product.discount && (
                        <span className="ml-3 text-sm text-gray-500 line-through">
                          {product.discount}
                        </span>
                      )}
                    </div>
                    <button 
                      className="w-full py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                      style={{ 
                        backgroundColor: "rgba(163, 22, 33, 0.1)", 
                        color: "#A31621"
                      }}
                      onClick={() => addToCart(product)}
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Right Navigation Arrow */}
            <button 
              onClick={() => scrollProducts('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll products right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#102542">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Premium Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { 
              title: "Ethically Sourced", 
              desc: "Animals raised with care on sustainable farms",
              icon: (
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="w-8 h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15C3 17.2091 4.79086 19 7 19C9.20914 19 11 17.2091 11 15V9C11 6.79086 9.20914 5 7 5C4.79086 5 3 6.79086 3 9V15Z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 15C13 17.2091 14.7909 19 17 19C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5C14.7909 5 13 6.79086 13 9V15Z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H18"></path>
                  </svg>
                </div>
              )
            },
            { 
              title: "Expertly Butchered", 
              desc: "Precision cuts by master butchers",
              icon: (
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              )
            },
            { 
              title: "Fast Delivery", 
              desc: "Fresh to your door in 24 hours",
              icon: (
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg className="w-8 h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                  </svg>
                </div>
              )
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-2xl transition-all flex items-start bg-white border border-gray-100 shadow-sm hover:shadow-md"
              whileHover={{ 
                y: -5,
                borderColor: "rgba(163, 22, 33, 0.3)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              <div className="mr-4">
                {item.icon}
              </div>
              <div>
                <h3 
                  className="font-bold text-xl mb-2"
                  style={{ color: "#102542" }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-gray-600"
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Hide scrollbar globally */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
}