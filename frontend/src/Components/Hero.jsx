// src/Components/Hero.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const slides = [
  {
    id: 1,
    brand: "sultanmabi",
    image: "/images/hero2.jpg",
    headline: "Premium Halal Meat Products",
    subtext: "Exceptional quality and taste for every occasion",
    cta: "Explore Products",
    link: "/products",
    badge: "Premium Quality",
    badgeColor: "#A31621",
    highlight: "🔥 New customer discount: 15% OFF first order",
    offer: "WELCOME",
    discount: "SAVE KSh 500",
    themeColor: "#102542",
    logo: "/images/sultanlogo.jpg",
    buttonColor: "#A31621"
  },
  {
    id: 2,
    brand: "choicemeats",
    image: "/images/halal1.jpg",
    headline: "100% Halal Meats",
    subtext: "Premium quality meats without pork",
    cta: "Shop Halal",
    link: "choice-meats",
    badge: "Halal Certified",
    badgeColor: "#4C7A34",
    highlight: "🔥 Buy 3kg of any meat, get 500g FREE!",
    offer: "SPECIAL",
    discount: "FREE 500g",
    themeColor: "#4C7A34",
    logo: "/images/choice.png",
    buttonColor: "#4C7A34",
    products: [
      {
        name: "Beef Cubes",
        price: "KSh 1,200",
        discount: "KSh 1,500",
        image: "/images/FCL Fresh cuts/Beefcuts/Beefcubes1.png",
        tag: "15% OFF"
      },
      {
        name: "Chicken Breast",
        price: "KSh 950",
        discount: "KSh 1,100",
        image: "/images/FCLSausagesPacks/ChickenSausages1kg.png",
        tag: "BEST DEAL"
      }
    ]
  },
  {
    id: 3,
    brand: "farmerschoice",
    image: "/images/grille2.jpg",
    headline: "All Meat Varieties",
    subtext: "Including premium pork products",
    cta: "View Range",
    link: "farmers-choice",
    badge: "Kenya's Favorite",
    badgeColor: "#A31621",
    highlight: "🔥 Special bundle deals available",
    offer: "BUNDLE",
    discount: "SAVE 40%",
    themeColor: "#A31621",
    logo: "/images/farmer.png",
    buttonColor: "#A31621",
    products: [
      {
        name: "Pork Chops",
        price: "KSh 1,100",
        discount: "KSh 1,400",
        image: "/images/FCL Fresh cuts/Porkcuts/Porkchops.png",
        tag: "LIMITED"
      },
      {
        name: "Beef Strips",
        price: "KSh 900",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefStrips.png",
        tag: "NEW"
      }
    ]
  },
  {
    id: 4,
    brand: "bacon",
    image: "/images/baconslide.jpg",
    headline: "Crispy, Smoky Bacon Perfection",
    subtext: "Dry-cured and smoked to perfection",
    cta: "Get Bacon",
    link: "/products/bacon",
    badge: "New Recipe",
    badgeColor: "#8C5E58",
    highlight: "🔥 Limited time: 25% off all bacon",
    offer: "FLASH SALE",
    discount: "ENDS SOON",
    themeColor: "#8C5E58",
    buttonColor: "#8C5E58"
  },
  {
    id: 5,
    brand: "sausages",
    image: "/images/sausagesslide.jpg",
    headline: "Gourmet Sausages for Every Occasion",
    subtext: "Handcrafted with the finest cuts of meat",
    cta: "Explore Sausages",
    link: "/products/sausages",
    badge: "Best Seller",
    badgeColor: "#102542",
    highlight: "🔥 Free delivery on orders over KSh 2000",
    offer: "POPULAR",
    discount: "BEST VALUE",
    themeColor: "#102542",
    buttonColor: "#102542"
  },
  {
    id: 6,
    brand: "smokies",
    image: "/images/smokyslide.jpg",
    headline: "Grill-Ready Smokies, Boldly Flavored",
    subtext: "Bursting with smoky goodness and grilled perfection",
    cta: "Shop Smokies",
    link: "/products/smokies",
    badge: "Crowd Favorite",
    badgeColor: "#A31621",
    highlight: "🔥 Buy 3 packs, get 1 FREE!",
    offer: "60% OFF",
    discount: "SAVE KSh 300",
    themeColor: "#A31621",
    buttonColor: "#A31621"
  }
];

const offerProducts = [
  {
    id: 1,
    name: "Smokies Pack",
    price: "KSh 1,200",
    discount: "KSh 1,500",
    image: "/public/images/continentals/smokies 1kg.png",
    tag: "Special Deal"
  },
  {
    id: 2,
    name: "Premium Bacon",
    price: "KSh 850",
    discount: "KSh 1,000",
    image: "/images/FCLBaconPacks/BackBacon1kg.png",
    tag: "25% OFF"
  },
  {
    id: 3,
    name: "Sausage Variety",
    price: "KSh 1,100",
    discount: "KSh 1,400",
    image: "/images/FCLSausagesPacks/BeefCatering1Kg.png",
    tag: "Best Seller"
  },
  {
    id: 4,
    name: "Beef Steaks",
    price: "KSh 1,800",
    image: "/images/FCL Fresh cuts/Beefcuts/Beefcubes1.png",
    tag: "New"
  },
  {
    id: 5,
    name: "Chicken smokies",
    price: "KSh 900",
    discount: "KSh 1,100",
    image: "/images/FCL Sausages Packs/ChickenSausages1kg.png",
    tag: "Family Pack"
  },
  {
    id: 6,
    name: "Beef strips",
    price: "KSh 750",
    image: "/images/FCL Fresh cuts/Beefcuts/BeefStrips.png",
    tag: "Quick Meal"
  },
  {
    id: 7,
    name: "Whole Pork leg",
    price: "KSh 1,600",
    discount: "KSh 1,900",
    image: "/images/FCL Fresh cuts/Porkcuts/WholePorkLeg.png",
    tag: "Chef's Choice"
  },
  {
    id: 8,
    name: "Nyama bite",
    price: "KSh 950",
    image: "/images/Nyamabite/Nyamabite2.png",
    tag: "Grill Ready"
  }
];

export default function Hero() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const productsRef = useRef(null);
  const cardWidth = 208; // w-52 = 208px
  const gapWidth = 16; // gap-4 = 16px
  const productsPerPage = 5;

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

  // Enhanced product carousel navigation with smooth scrolling
  const scrollProducts = (direction) => {
    if (productsRef.current) {
      const container = productsRef.current;
      const scrollAmount = (cardWidth + gapWidth) * productsPerPage;
      let newScrollPosition;

      if (direction === 'right') {
        newScrollPosition = container.scrollLeft + scrollAmount;
        // If we're at the end, instantly scroll to the beginning without animation
        if (newScrollPosition >= container.scrollWidth - container.clientWidth) {
          container.scrollTo({ left: 0, behavior: 'instant' });
          newScrollPosition = scrollAmount;
        }
      } else {
        newScrollPosition = container.scrollLeft - scrollAmount;
        // If we're at the beginning, instantly scroll to the end without animation
        if (newScrollPosition <= 0) {
          container.scrollTo({ 
            left: container.scrollWidth, 
            behavior: 'instant' 
          });
          newScrollPosition = container.scrollWidth - scrollAmount - container.clientWidth;
        }
      }

      // Smooth scroll to the new position
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Duplicate products for seamless looping
  const getDisplayProducts = () => {
    return [...offerProducts, ...offerProducts, ...offerProducts];
  };

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

  return (
    <section 
      className="relative w-full pt-0 pb-8 px-4 overflow-hidden"
      id="home"
      style={{ 
        backgroundColor: "#FCF7F8",
        backgroundImage: "radial-gradient(rgba(163, 22, 33, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Slogan with Sultanmabi Logo */}
        <div className="flex flex-col items-center mb-10 relative">
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-4"
            >
              <img 
                src="/images/sultanmabi-logo.png" 
                alt="Sultanmabi Logo" 
                className="w-24 h-24 object-contain"
              />
            </motion.div>
            
            <motion.div
              className="text-center"
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
          </div>
        </div>
        
        {/* COMPLETELY REDESIGNED SLIDES */}
        <div className="relative">
          {/* Brand Logos on Sides (Outside Slides Container) */}
          <div className="absolute inset-y-0 left-0 flex items-center z-20 -translate-x-1/2">
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
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
                />
              </motion.div>
            </Link>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center z-20 translate-x-1/2">
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
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
                />
              </motion.div>
            </Link>
          </div>
          
          <div 
            className="relative rounded-2xl overflow-hidden mb-10"
            style={{ 
              boxShadow: "0 20px 50px rgba(16, 37, 66, 0.15)"
            }}
          >
            {/* Slides Container */}
            <div className="relative h-[500px] overflow-hidden">
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
                      filter: "brightness(0.9)"
                    }}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: `linear-gradient(90deg, ${slides[currentSlide].themeColor}99 0%, rgba(16, 37, 66, 0.4) 100%)` 
                      }}
                    />
                  </div>

                  {/* REDESIGNED SLIDE CONTENT */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 text-white">
                    {/* Top Section - Offer Badge */}
                    <div className="flex justify-end">
                      <motion.div 
                        className="py-2 px-4 md:px-6 rounded-full font-bold text-base md:text-lg"
                        style={{ 
                          backgroundColor: slides[currentSlide].badgeColor,
                          boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
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
                      >
                        {slides[currentSlide].offer}
                      </motion.div>
                    </div>
                    
                    {/* Center Content - Responsive Layout */}
                    <div className="flex flex-col items-center text-center px-2">
                      {/* Brand Logo for First 3 Slides */}
                      {slides[currentSlide].brand === 'sultanmabi' || 
                      slides[currentSlide].brand === 'choicemeats' || 
                      slides[currentSlide].brand === 'farmerschoice' ? (
                        <motion.div 
                          className="mb-4 md:mb-6"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <img 
                            src={slides[currentSlide].logo} 
                            alt={`${slides[currentSlide].brand} logo`}
                            className="h-16 md:h-24 object-contain"
                          />
                        </motion.div>
                      ) : (
                        <motion.div 
                          className="mb-4 md:mb-6 bg-white/10 backdrop-blur-sm py-2 px-4 md:py-3 md:px-6 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span className="font-bold text-base md:text-xl">
                            {slides[currentSlide].badge}
                          </span>
                        </motion.div>
                      )}
                      
                      <motion.h2 
                        className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 max-w-3xl"
                        variants={contentVariants}
                      >
                        {slides[currentSlide].headline}
                      </motion.h2>
                      
                      <motion.p 
                        className="text-base md:text-xl mb-4 md:mb-8 max-w-2xl"
                        variants={contentVariants}
                      >
                        {slides[currentSlide].subtext}
                      </motion.p>
                      
                      {/* Product Offers for ChoiceMeats & FarmersChoice */}
                      {(slides[currentSlide].brand === 'choicemeats' || slides[currentSlide].brand === 'farmerschoice') && (
                        <motion.div 
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8 max-w-md"
                          variants={contentVariants}
                        >
                          {slides[currentSlide].products.map((product, index) => (
                            <div 
                              key={index} 
                              className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-4 border border-white/30"
                            >
                              <div className="flex items-center mb-2">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
                                <div className="ml-2 md:ml-3 text-left">
                                  <h3 className="font-bold text-sm md:text-base">{product.name}</h3>
                                  <div className="flex items-center">
                                    <span className="font-bold text-sm md:text-base">{product.price}</span>
                                    {product.discount && (
                                      <span className="ml-1 md:ml-2 text-xs md:text-sm line-through opacity-80">
                                        {product.discount}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full inline-block">
                                {product.tag}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                      
                      <motion.div 
                        className="text-base md:text-xl lg:text-2xl font-bold mb-4 md:mb-8 flex items-center animate-pulse"
                        variants={contentVariants}
                      >
                        <svg 
                          className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-1 md:mr-2" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" 
                          />
                        </svg>
                        {slides[currentSlide].highlight}
                      </motion.div>
                      
                      <motion.div 
                        variants={contentVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={slides[currentSlide].link}
                          className="inline-flex items-center font-bold px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full text-base md:text-xl transition-all duration-300"
                          style={{ 
                            backgroundColor: slides[currentSlide].buttonColor, 
                            color: "#FFFFFF",
                            boxShadow: `0 5px 25px ${slides[currentSlide].buttonColor}80`
                          }}
                        >
                          {slides[currentSlide].cta}
                          <svg 
                            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ml-2 md:ml-3" 
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
                    </div>
                    
                    {/* Bottom Section - Discount */}
                    <motion.div 
                      className="bg-black/30 py-2 px-4 md:py-4 md:px-8 rounded-full self-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <span className="font-bold text-lg md:text-2xl">
                        {slides[currentSlide].discount}
                      </span>
                    </motion.div>
                  </div>
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
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "scale-150" : "opacity-60"
                    }`}
                    style={{ 
                      backgroundColor: index === currentSlide ? "#FFD700" : "#FFFFFF" 
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Product Offers Carousel */}
        <div className="mt-10 mb-12 relative">
          <div className="flex items-center justify-between mb-6 px-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: "#102542" }}>
              Today's Special Offers
              <span className="ml-2 md:ml-3 text-xs md:text-sm font-normal bg-red-100 text-red-800 py-1 px-2 rounded-full">
                Limited Time Only
              </span>
            </h2>
          </div>
          
          <div className="relative">
            {/* Left Navigation Arrow */}
            <button 
              onClick={() => scrollProducts('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll products left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" viewBox="0 0 20 20" fill="#102542">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Product Carousel */}
            <div 
              ref={productsRef}
              className="flex overflow-x-auto scrollbar-hide pb-6 px-2"
              style={{ 
                scrollBehavior: 'smooth',
                scrollSnapType: 'x mandatory'
              }}
            >
              {getDisplayProducts().map((product, index) => (
                <div 
                  key={`${product.id}-${index}`}
                  className="flex-shrink-0 w-40 md:w-52 mx-2 snap-start"
                >
                  <motion.div 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-28 md:h-36 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentNode.innerHTML = '<div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-28 md:h-36"></div>';
                        }}
                      />
                      {product.tag && (
                        <div className="absolute top-2 md:top-3 right-2 md:right-3 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-bold text-white" 
                             style={{ 
                               backgroundColor: "#A31621",
                               boxShadow: "0 2px 6px rgba(163, 22, 33, 0.4)"
                             }}>
                          {product.tag}
                        </div>
                      )}
                    </div>
                    <div className="p-2 md:p-3">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1">{product.name}</h3>
                      <div className="flex items-center mb-1 md:mb-2">
                        <span className="text-base md:text-lg font-bold" style={{ color: "#102542" }}>
                          {product.price}
                        </span>
                        {product.discount && (
                          <span className="ml-2 md:ml-3 text-xs md:text-sm text-gray-500 line-through">
                            {product.discount}
                          </span>
                        )}
                      </div>
                      <button 
                        className="w-full py-1 md:py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
                        style={{ 
                          backgroundColor: "rgba(163, 22, 33, 0.1)", 
                          color: "#A31621"
                        }}
                        onClick={() => addToCart(product)}
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* Right Navigation Arrow */}
            <button 
              onClick={() => scrollProducts('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll products right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" viewBox="0 0 20 20" fill="#102542">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Premium Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {[
            { 
              title: "Ethically Sourced", 
              desc: "Animals raised with care on sustainable farms",
              icon: (
                <div className="bg-red-100 p-2 md:p-3 rounded-full">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              )
            },
            { 
              title: "Fast Delivery", 
              desc: "Fresh to your door in 24 hours",
              icon: (
                <div className="bg-yellow-100 p-2 md:p-3 rounded-full">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                  </svg>
                </div>
              )
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="p-4 md:p-6 rounded-2xl transition-all flex items-start bg-white border border-gray-100 shadow-sm hover:shadow-md"
              whileHover={{ 
                y: -5,
                borderColor: "rgba(163, 22, 33, 0.3)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              <div className="mr-3 md:mr-4">
                {item.icon}
              </div>
              <div>
                <h3 
                  className="font-bold text-lg md:text-xl mb-1 md:mb-2"
                  style={{ color: "#102542" }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-sm md:text-base text-gray-600"
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