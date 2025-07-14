// src/Components/Hero.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "/images/smokies-hero.jpg",
    headline: "Sizzling Hot Smokies Delight",
    subtext: "Juicy, flavorful smokies that are a hit at any gathering. Grill them, roast them, or fry them to perfection!",
    cta: "Shop Smokies",
    link: "/products/smokies",
    badge: "Crowd Favorite",
    badgeColor: "#FF6B00",
    highlight: "Buy 3 packs, get 1 FREE!"
  },
  {
    id: 2,
    image: "/images/bacon-hero.jpg",
    headline: "Crispy, Smoky Bacon Perfection",
    subtext: "Our premium bacon is dry-cured and smoked to perfection. Perfect for breakfast or adding flavor to any dish.",
    cta: "Get Bacon",
    link: "/products/bacon",
    badge: "New Recipe",
    badgeColor: "#A31621",
    highlight: "Limited time: 25% off all bacon"
  },
  {
    id: 3,
    image: "/images/sausages-hero.jpg",
    headline: "Gourmet Sausages for Every Occasion",
    subtext: "Handcrafted with the finest cuts of meat and a blend of spices. From breakfast links to dinner bratwurst.",
    cta: "Explore Sausages",
    link: "/products/sausages",
    badge: "Best Seller",
    badgeColor: "#102542",
    highlight: "Free delivery on orders over KSh 2000"
  },
  {
    id: 4,
    image: "/images/farmers-choice-hero.jpg",
    headline: "Farmers Choice: Quality You Can Trust",
    subtext: "Discover our full range of Farmers Choice products, known for their consistent quality and delicious taste.",
    cta: "View Range",
    link: "/brands/farmers-choice",
    badge: "Kenya's Favorite",
    badgeColor: "#4C7A34",
    highlight: "Special bundle deals available"
  },
  {
    id: 5,
    image: "/images/choice-meat-hero.jpg",
    headline: "Choice Meat: Premium Cuts for Discerning Palates",
    subtext: "Indulge in our premium meat selection, carefully sourced and expertly prepared for your table.",
    cta: "Shop Choice Meat",
    link: "/brands/choice-meat",
    badge: "Premium Quality",
    badgeColor: "#C41E3D",
    highlight: "Butcher's special cuts available"
  },
  {
    id: 6,
    image: "/images/sultanmabi-hero.jpg",
    headline: "Sultanmabi: Your Trusted Meat Partner",
    subtext: "From farm to fork, we deliver the finest meats with a commitment to quality and sustainability.",
    cta: "Learn About Us",
    link: "/about",
    badge: "Est. 2005",
    badgeColor: "#8C5E58",
    highlight: "Join our loyalty program today!"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Logo animation variants
  const logoVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, delay: 0.3 }
    },
    hover: {
      scale: 1.1,
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

  return (
    <section 
      className="relative w-full py-12 px-4" 
      id="home"
      style={{ backgroundColor: "#FCF7F8" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Fixed Slogan with Flanking Logos */}
        <div className="flex items-center justify-center mb-10 px-4">
          {/* Left Logo - Increased size */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="mx-2 md:mx-4 cursor-pointer"
          >
            <img 
              src="/images/farmer.png" 
              alt="Sultanmabi Premium Meats" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </motion.div>
          
          <div className="text-center flex-1">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ color: "#A31621" }}
            >
              MEAT-ING CUSTOMER EXPECTATIONS
            </motion.h1>
            
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "#102542" }}></div>
          </div>
          
          {/* Right Logo - Increased size */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="mx-2 md:mx-4 cursor-pointer"
          >
            <img 
              src="/images/choice.png" 
              alt="Sultanmabi Premium Meats" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </motion.div>
        </div>
        
        {/* Marketing-Focused Carousel */}
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{ 
            backgroundColor: "#FCF7F8",
            boxShadow: "0 15px 40px rgba(16, 37, 66, 0.1)"
          }}
        >
          {/* Slides Container */}
          <div className="relative h-[550px] overflow-hidden">
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
                {/* Background Image with Gradient */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: "linear-gradient(to bottom, rgba(16, 37, 66, 0.3), rgba(16, 37, 66, 0.8))" 
                    }}
                  />
                </div>
                
                {/* Content Card */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8 p-8 rounded-2xl max-w-3xl mx-auto"
                  style={{ backgroundColor: "rgba(252, 247, 248, 0.95)" }}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Promo Badge */}
                  <motion.div 
                    className="absolute -top-4 right-8 py-2 px-4 rounded-full font-bold text-white"
                    style={{ backgroundColor: slides[currentSlide].badgeColor }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {slides[currentSlide].badge}
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: "#102542" }}
                    variants={contentVariants}
                  >
                    {slides[currentSlide].headline}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg mb-6 max-w-2xl"
                    style={{ color: "#102542", opacity: 0.9 }}
                    variants={contentVariants}
                  >
                    {slides[currentSlide].subtext}
                  </motion.p>
                  
                  {/* Promotion Highlight */}
                  <motion.div 
                    className="mb-6 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <svg 
                      className="w-6 h-6 mr-2" 
                      fill="#A31621" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="font-bold" style={{ color: "#A31621" }}>
                      {slides[currentSlide].highlight}
                    </span>
                  </motion.div>
                  
                  <motion.div variants={contentVariants}>
                    <Link
                      to={slides[currentSlide].link}
                      className="inline-block font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: "#A31621", 
                        color: "#FCF7F8",
                        boxShadow: "0 4px 15px rgba(163, 22, 33, 0.4)"
                      }}
                    >
                      {slides[currentSlide].cta}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
            <div className="flex space-x-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
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
        
        {/* Premium Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Ethically Sourced", 
              desc: "Animals raised with care on sustainable farms",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15C3 17.2091 4.79086 19 7 19C9.20914 19 11 17.2091 11 15V9C11 6.79086 9.20914 5 7 5C4.79086 5 3 6.79086 3 9V15Z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 15C13 17.2091 14.7909 19 17 19C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5C14.7909 5 13 6.79086 13 9V15Z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H18"></path>
                </svg>
              )
            },
            { 
              title: "Expertly Butchered", 
              desc: "Precision cuts by master butchers",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              )
            },
            { 
              title: "Fast Delivery", 
              desc: "Fresh to your door in 24 hours",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="#A31621" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                </svg>
              )
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="p-7 rounded-2xl transition-all flex items-start"
              style={{ 
                backgroundColor: "#FCF7F8",
                border: "1px solid rgba(16, 37, 66, 0.1)",
                boxShadow: "0 5px 20px rgba(16, 37, 66, 0.05)"
              }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 10px 30px rgba(16, 37, 66, 0.1)",
                borderColor: "rgba(163, 22, 33, 0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="mr-4">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <div 
                    className="w-8 h-1 rounded-full mr-3" 
                    style={{ backgroundColor: "#A31621" }}
                  ></div>
                  <h3 
                    className="font-bold text-xl"
                    style={{ color: "#102542" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p 
                  className="pl-1"
                  style={{ color: "#102542", opacity: 0.85 }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}