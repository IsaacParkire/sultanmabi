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
    <div className="relative py-8 overflow-hidden bg-gradient-to-r from-[#A31621] to-[#102542]">
      {/* Simplified decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join Our Meat Lovers Club
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base text-white/90 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get exclusive offers, new product alerts, and grilling tips
          </motion.p>
        </div>        {isSubscribed ? (
          <motion.div
            className="bg-white/15 backdrop-blur-sm p-6 rounded-xl text-center border border-white/20 max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-4xl mb-3">✓</div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome to the Club!</h3>
            <p className="text-white/90 mb-4 text-sm">
              Thank you for subscribing. Check your inbox for a special welcome offer.
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
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
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
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg text-[#102542] bg-white focus:outline-none focus:ring-2 focus:ring-white shadow-lg placeholder-gray-500"
                disabled={isLoading}
              />
              <svg 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            
            <button 
              type="submit"
              className={`px-6 py-3 rounded-lg font-medium shadow-lg transform transition-all duration-300 text-white ${
                isLoading 
                  ? "bg-gray-600 cursor-not-allowed" 
                  : "bg-[#102542] hover:bg-[#0d1f36] hover:scale-105"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                <div className="flex items-center">
                  Subscribe
                  <svg 
                    className="ml-2 w-4 h-4" 
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
          className="text-center text-white/70 text-xs mt-4 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
        </motion.p>
        
        <motion.div 
          className="flex justify-center mt-6 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="bg-white/20 rounded-lg w-6 h-6 mr-2 flex items-center justify-center">
              <span className="text-white text-xs font-bold">%</span>
            </div>
            <div>
              <div className="text-xs text-white/80">Welcome gift</div>
              <div className="text-white font-medium text-sm">15% OFF</div>
            </div>
          </div>
          
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="bg-white/20 rounded-lg w-6 h-6 mr-2 flex items-center justify-center">
              <span className="text-white text-xs">📧</span>
            </div>
            <div>
              <div className="text-xs text-white/80">Monthly</div>
              <div className="text-white font-medium text-sm">Tips & Recipes</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}