// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ChevronLeft, CreditCard, Smartphone, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Format currency as Kenyan Shillings
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your payment was successful and your order is being processed. 
            You'll receive a confirmation message shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium">Order Total: {formatCurrency(cartTotal)}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/products"
              className="flex-1 bg-[#A31621] hover:bg-[#8a1220] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 text-center"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-colors duration-300 text-center"
            >
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <div className="flex items-center mb-6">
        <Link to="/cart" className="flex items-center text-[#102542] hover:text-[#A31621] transition-colors">
          <ChevronLeft className="mr-1" size={20} />
          Back to Cart
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-center mx-auto">
          Checkout
          {cartCount > 0 && <span className="text-[#A31621] ml-2">({cartCount})</span>}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Form */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                  placeholder="Any special instructions for delivery..."
                ></textarea>
              </div>
            </motion.div>
            
            {/* Payment Method */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Payment Method</h2>
              
              <div className="space-y-4">
                {/* M-Pesa Option */}
                <div 
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === "mpesa" 
                      ? "border-[#A31621] bg-[#fdf3f4]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setPaymentMethod("mpesa")}
                >
                  <div className={`w-5 h-5 border rounded-full mr-4 mt-1 flex items-center justify-center ${
                    paymentMethod === "mpesa" 
                      ? "border-[#A31621] bg-[#A31621]" 
                      : "border-gray-400"
                  }`}>
                    {paymentMethod === "mpesa" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Smartphone className="text-[#4CAF50] mr-2" size={20} />
                      <h3 className="font-medium text-gray-800">M-Pesa</h3>
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Recommended
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      You'll receive a payment request on your phone to complete the transaction.
                    </p>
                    
                    {paymentMethod === "mpesa" && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-2">
                          Enter your M-Pesa phone number below:
                        </p>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">
                            +254
                          </div>
                          <input
                            type="tel"
                            placeholder="700 000 000"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-[#A31621] focus:border-[#A31621]"
                            pattern="[0-9]{9}"
                            title="Enter 9-digit phone number"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Credit Card Option */}
                <div 
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === "card" 
                      ? "border-[#A31621] bg-[#fdf3f4]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className={`w-5 h-5 border rounded-full mr-4 mt-1 flex items-center justify-center ${
                    paymentMethod === "card" 
                      ? "border-[#A31621] bg-[#A31621]" 
                      : "border-gray-400"
                  }`}>
                    {paymentMethod === "card" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <CreditCard className="text-[#102542] mr-2" size={20} />
                      <h3 className="font-medium text-gray-800">Credit/Debit Card</h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Securely pay with Visa, Mastercard, or American Express.
                    </p>
                    
                    {paymentMethod === "card" && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="0000 0000 0000 0000"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621]"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Cash on Delivery Option */}
                <div 
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === "cash" 
                      ? "border-[#A31621] bg-[#fdf3f4]" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <div className={`w-5 h-5 border rounded-full mr-4 mt-1 flex items-center justify-center ${
                    paymentMethod === "cash" 
                      ? "border-[#A31621] bg-[#A31621]" 
                      : "border-gray-400"
                  }`}>
                    {paymentMethod === "cash" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Wallet className="text-[#FF9800] mr-2" size={20} />
                      <h3 className="font-medium text-gray-800">Cash on Delivery</h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Pay in cash when your order is delivered to your doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 sticky top-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                  <span>Total</span>
                  <span className="text-[#A31621]">{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#A31621] hover:bg-[#8a1220] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 shadow-md flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  `Pay ${formatCurrency(cartTotal)}`
                )}
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                <svg className="inline-block mr-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Secure payment processing
              </p>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-700 mb-3">Your Order</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex items-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-gray-500 text-xs">{item.weight || '200g'}</p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </form>
    </div>
  );
}