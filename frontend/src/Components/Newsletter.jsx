// src/Components/Newsletter.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail("");
      
      // Reset after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <div className="relative py-16 overflow-hidden bg-gradient-to-br from-[#102542] to-[#1a3a5f]">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#A31621]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#4C7A34]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join Our Meat Lovers Club
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Subscribe to get exclusive offers, new product alerts, and grilling tips from our master butchers
          </motion.p>
        </div>

        {isSubscribed ? (
          <motion.div
            className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20 max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Club!</h3>
            <p className="text-white/90 mb-6">
              Thank you for subscribing to our newsletter. Check your inbox for a special welcome offer.
            </p>
            <button 
              onClick={() => setIsSubscribed(false)}
              className="text-white/80 hover:text-white underline text-sm"
            >
              Subscribe another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative flex-grow">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your best email address"
                className="w-full px-5 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A31621] shadow-lg"
                disabled={isLoading}
              />
              <svg 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            
            <button 
              type="submit"
              className={`px-8 py-4 rounded-xl font-medium shadow-lg transform transition-all duration-300 ${
                isLoading 
                  ? "bg-gray-600 cursor-not-allowed" 
                  : "bg-[#A31621] hover:bg-[#8a1220] hover:scale-105"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                <div className="flex items-center">
                  Subscribe Now 
                  <svg 
                    className="ml-2 w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              )}
            </button>
          </motion.form>
        )}
        
        <motion.p 
          className="text-center text-white/60 text-sm mt-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          By subscribing, you agree to receive marketing emails. We respect your privacy - unsubscribe anytime.
        </motion.p>
        
        <motion.div 
          className="flex justify-center mt-10 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2" />
            <div>
              <div className="text-xs text-white/80">First subscriber gift</div>
              <div className="text-white font-medium">15% OFF</div>
            </div>
          </div>
          
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2" />
            <div>
              <div className="text-xs text-white/80">Monthly exclusive</div>
              <div className="text-white font-medium">Recipes & Tips</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}