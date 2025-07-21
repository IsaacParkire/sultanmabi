// src/pages/CartPage.jsx
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, ChevronLeft, ShoppingBag, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, clearCart, cartTotal, cartCount } = useCart();
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Format currency as Kenyan Shillings
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Handle clear cart with confirmation
  const handleClearCart = () => {
    setIsClearingCart(true);
    setTimeout(() => {
      clearCart();
      setIsClearingCart(false);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }, 800);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="flex items-center mb-6">
        <Link to="/products" className="flex items-center text-[#102542] hover:text-[#A31621] transition-colors">
          <ChevronLeft className="mr-1" size={20} />
          Continue Shopping
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-center mx-auto">
          Your Shopping Cart
          {cartCount > 0 && <span className="text-[#A31621] ml-2">({cartCount})</span>}
        </h1>
      </div>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center z-50 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Check className="mr-2" />
            Cart cleared successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {cartItems.length === 0 ? (
        <motion.div 
          className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag size={60} className="text-gray-300 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md text-center">
            Looks like you haven't added anything to your cart yet. Browse our products and find something special!
          </p>
          <Link
            to="/products"
            className="bg-[#A31621] hover:bg-[#8a1220] text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors duration-300 shadow-md"
          >
            Explore Products
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b font-medium text-gray-600">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 p-4 md:p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="col-span-12 md:col-span-5 flex items-center">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border mr-4"
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-[#A31621] transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.weight || '200g'}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-2 flex md:block items-center">
                      <span className="md:hidden font-medium text-gray-600 mr-2">Price:</span>
                      <p className="font-medium text-gray-800">{formatCurrency(item.price)}</p>
                    </div>
                    
                    <div className="col-span-4 md:col-span-3 flex md:block items-center">
                      <span className="md:hidden font-medium text-gray-600 mr-2">Quantity:</span>
                      <div className="flex items-center border rounded-lg w-fit">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-2 flex md:block items-center">
                      <span className="md:hidden font-medium text-gray-600 mr-2">Total:</span>
                      <p className="font-semibold text-gray-800">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-4 md:p-6 border-t flex justify-end">
                <button
                  onClick={handleClearCart}
                  className="flex items-center text-gray-600 hover:text-[#A31621] transition-colors"
                  disabled={isClearingCart}
                >
                  {isClearingCart ? (
                    <>
                      <span className="animate-spin mr-2">↻</span> Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} className="mr-1" />
                      Clear Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                  <span>Total</span>
                  <span className="text-[#A31621]">{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="block w-full bg-[#A31621] hover:bg-[#8a1220] text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-300 shadow-md"
              >
                Proceed to Checkout
              </Link>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Secure payment processing. Your information is protected.
              </p>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-700 mb-3">Accepted Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs">M-Pesa</div>
                  <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs">Visa</div>
                  <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs">MasterCard</div>
                  <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs">Airtel Money</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}