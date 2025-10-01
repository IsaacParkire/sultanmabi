// src/Components/MultiStepCheckout.jsx
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  MapPin,
  Clock,
  Phone,
  Smartphone,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Delivery zones with pricing
const DELIVERY_ZONES = [
  {
    id: 'nyali',
    name: 'Nyali Area',
    description: 'Main shop location',
    fee: 0,
    estimatedTime: '30-45 minutes',
    areas: ['Nyali', 'Nyali Centre', 'Links Road', 'Citymall Area']
  },
  {
    id: 'diani',
    name: 'Diani Area', 
    description: 'Branch location',
    fee: 0,
    estimatedTime: '30-45 minutes',
    areas: ['Diani Beach', 'Ukunda', 'Galu', 'Tiwi']
  },
  {
    id: 'mombasa_central',
    name: 'Mombasa Central',
    description: 'CBD and surrounding areas',
    fee: 150,
    estimatedTime: '45-60 minutes',
    areas: ['CBD', 'Old Town', 'Majengo', 'Bondeni', 'Tudor']
  },
  {
    id: 'north_coast',
    name: 'North Coast',
    description: 'Beyond Nyali',
    fee: 200,
    estimatedTime: '60-75 minutes',
    areas: ['Bamburi', 'Shanzu', 'Kikambala', 'Vipingo', 'Kilifi']
  },
  {
    id: 'south_coast',
    name: 'South Coast',
    description: 'Beyond Diani',
    fee: 250,
    estimatedTime: '75-90 minutes',
    areas: ['Msambweni', 'Funzi', 'Chale Island', 'Shimoni']
  },
  {
    id: 'mainland',
    name: 'Mainland Areas',
    description: 'Mariakani, Kaloleni, etc.',
    fee: 300,
    estimatedTime: '90-120 minutes',
    areas: ['Mariakani', 'Kaloleni', 'Mazeras', 'Mtwapa']
  }
];

export default function MultiStepCheckout() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Form data
  const [personalData, setPersonalData] = useState({
    fullName: "",
    email: "",
    phone: "",
    alternativePhone: ""
  });

  const [deliveryData, setDeliveryData] = useState({
    type: "delivery", // delivery or pickup
    zone: "",
    customAddress: "",
    specificLocation: "",
    deliveryInstructions: "",
    preferredTime: "asap"
  });

  const [paymentData, setPaymentData] = useState({
    method: "mpesa",
    mpesaPhone: "",
    cardDetails: {
      number: "",
      name: "",
      expiry: "",
      cvv: ""
    }
  });

  // Get selected zone details
  const selectedZone = DELIVERY_ZONES.find(zone => zone.id === deliveryData.zone);
  const deliveryFee = selectedZone ? selectedZone.fee : 0;
  const finalTotal = cartTotal + deliveryFee;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation functions
  const isPersonalDataValid = () => {
    return personalData.fullName && personalData.email && personalData.phone;
  };

  const isDeliveryDataValid = () => {
    if (deliveryData.type === "pickup") return true;
    return deliveryData.zone && (deliveryData.customAddress || deliveryData.specificLocation);
  };

  const isPaymentDataValid = () => {
    if (paymentData.method === "mpesa") {
      return paymentData.mpesaPhone;
    }
    if (paymentData.method === "card") {
      return paymentData.cardDetails.number && paymentData.cardDetails.name && 
             paymentData.cardDetails.expiry && paymentData.cardDetails.cvv;
    }
    return true; // Cash on delivery
  };

  // Handle form submissions
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    if (isPersonalDataValid()) {
      nextStep();
    }
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    if (isDeliveryDataValid()) {
      nextStep();
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (isPaymentDataValid()) {
      nextStep();
    }
  };

  const handleFinalSubmit = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
      // Clear cart after successful order
      setTimeout(() => clearCart(), 1000);
    }, 3000);
  };

  // Step indicator component
  const StepIndicator = () => {
    const steps = [
      { number: 1, title: "Personal Details", icon: User },
      { number: 2, title: "Delivery", icon: Truck },
      { number: 3, title: "Payment", icon: CreditCard },
      { number: 4, title: "Complete", icon: CheckCircle }
    ];

    return (
      <div className="flex items-center justify-between mb-8 bg-white rounded-xl p-6 shadow-sm">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : isActive 
                    ? 'bg-[#A31621] border-[#A31621] text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? (
                  <CheckCircle size={20} />
                ) : (
                  <Icon size={20} />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  isActive ? 'text-[#A31621]' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  Step {step.number}
                </p>
                <p className={`text-xs ${
                  isActive ? 'text-gray-700' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-px mx-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Order success screen
  if (orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order! Your payment was successful and your order is being processed. 
            You'll receive a confirmation via SMS and email.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-medium">Order Total: {formatCurrency(finalTotal)}</p>
            {deliveryData.type === "delivery" && selectedZone && (
              <p className="text-sm text-gray-600 mt-1">
                Estimated delivery: {selectedZone.estimatedTime}
              </p>
            )}
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

  // Main checkout interface
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Step Indicator */}
      <StepIndicator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
                  Personal Information
                </h2>
                
                <form onSubmit={handlePersonalSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={personalData.fullName}
                        onChange={(e) => setPersonalData({...personalData, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={personalData.email}
                        onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Phone Number *
                      </label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">
                          +254
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          value={personalData.phone}
                          onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                          placeholder="700 000 000"
                          pattern="[0-9]{9}"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="alternativePhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Alternative Phone (Optional)
                      </label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">
                          +254
                        </div>
                        <input
                          type="tel"
                          id="alternativePhone"
                          value={personalData.alternativePhone}
                          onChange={(e) => setPersonalData({...personalData, alternativePhone: e.target.value})}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                          placeholder="700 000 000"
                          pattern="[0-9]{9}"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!isPersonalDataValid()}
                      className="bg-[#A31621] hover:bg-[#8a1220] disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
                    >
                      Continue to Delivery
                      <ChevronRight size={20} className="ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Delivery Options */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
                  Delivery Options
                </h2>
                
                <form onSubmit={handleDeliverySubmit} className="space-y-6">
                  {/* Delivery Type Selection */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Choose delivery method:</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          deliveryData.type === "delivery" 
                            ? "border-[#A31621] bg-[#fdf3f4]" 
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setDeliveryData({...deliveryData, type: "delivery"})}
                      >
                        <div className="flex items-center">
                          <Truck className="text-[#A31621] mr-3" size={24} />
                          <div>
                            <h4 className="font-medium text-gray-800">Home Delivery</h4>
                            <p className="text-sm text-gray-600">Delivered to your door</p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          deliveryData.type === "pickup" 
                            ? "border-[#A31621] bg-[#fdf3f4]" 
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setDeliveryData({...deliveryData, type: "pickup"})}
                      >
                        <div className="flex items-center">
                          <MapPin className="text-[#A31621] mr-3" size={24} />
                          <div>
                            <h4 className="font-medium text-gray-800">Store Pickup</h4>
                            <p className="text-sm text-gray-600">Collect from our store</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Zone Selection */}
                  {deliveryData.type === "delivery" && (
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-700">Select your delivery zone:</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DELIVERY_ZONES.map((zone) => (
                          <div 
                            key={zone.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              deliveryData.zone === zone.id 
                                ? "border-[#A31621] bg-[#fdf3f4]" 
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            onClick={() => setDeliveryData({...deliveryData, zone: zone.id})}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">{zone.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{zone.description}</p>
                                <div className="flex items-center text-sm text-gray-500 mb-1">
                                  <Clock size={14} className="mr-1" />
                                  {zone.estimatedTime}
                                </div>
                                <div className="text-xs text-gray-400">
                                  Areas: {zone.areas.join(', ')}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`font-semibold ${zone.fee === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                  {zone.fee === 0 ? 'FREE' : formatCurrency(zone.fee)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Address Details */}
                  {deliveryData.type === "delivery" && deliveryData.zone && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="customAddress" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Address *
                        </label>
                        <input
                          type="text"
                          id="customAddress"
                          value={deliveryData.customAddress}
                          onChange={(e) => setDeliveryData({...deliveryData, customAddress: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                          placeholder="Enter your full address"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="specificLocation" className="block text-sm font-medium text-gray-700 mb-2">
                          Specific Location/Landmark
                        </label>
                        <input
                          type="text"
                          id="specificLocation"
                          value={deliveryData.specificLocation}
                          onChange={(e) => setDeliveryData({...deliveryData, specificLocation: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                          placeholder="e.g., Near City Mall, Blue house with gate"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                          id="deliveryInstructions"
                          rows="3"
                          value={deliveryData.deliveryInstructions}
                          onChange={(e) => setDeliveryData({...deliveryData, deliveryInstructions: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                          placeholder="Any special instructions for our delivery team..."
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Delivery Time
                        </label>
                        <select
                          id="preferredTime"
                          value={deliveryData.preferredTime}
                          onChange={(e) => setDeliveryData({...deliveryData, preferredTime: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                        >
                          <option value="asap">As soon as possible</option>
                          <option value="morning">Morning (8AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 6PM)</option>
                          <option value="evening">Evening (6PM - 9PM)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Store Pickup Information */}
                  {deliveryData.type === "pickup" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Store Pickup Locations</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-blue-700">Nyali Shop</p>
                          <p className="text-sm text-blue-600">Links Road, Nyali Centre</p>
                          <p className="text-sm text-blue-600">Open: Mon-Sat 8AM-8PM, Sun 9AM-6PM</p>
                        </div>
                        <div>
                          <p className="font-medium text-blue-700">Diani Branch</p>
                          <p className="text-sm text-blue-600">Diani Beach Road, Ukunda</p>
                          <p className="text-sm text-blue-600">Open: Mon-Sat 8AM-8PM, Sun 9AM-6PM</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 mt-3">
                        You'll receive an SMS when your order is ready for pickup.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
                    >
                      <ChevronLeft size={20} className="mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isDeliveryDataValid()}
                      className="bg-[#A31621] hover:bg-[#8a1220] disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
                    >
                      Continue to Payment
                      <ChevronRight size={20} className="ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
                  Payment Method
                </h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* M-Pesa Option */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentData.method === "mpesa" 
                          ? "border-[#A31621] bg-[#fdf3f4]" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setPaymentData({...paymentData, method: "mpesa"})}
                    >
                      <div className="flex items-center">
                        <Smartphone className="text-green-600 mr-3" size={24} />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">M-Pesa</h4>
                          <p className="text-sm text-gray-600">Pay via M-Pesa mobile money</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Recommended
                        </span>
                      </div>
                      
                      {paymentData.method === "mpesa" && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                          <label htmlFor="mpesaPhone" className="block text-sm font-medium text-gray-700 mb-2">
                            M-Pesa Phone Number
                          </label>
                          <div className="flex">
                            <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">
                              +254
                            </div>
                            <input
                              type="tel"
                              id="mpesaPhone"
                              value={paymentData.mpesaPhone}
                              onChange={(e) => setPaymentData({...paymentData, mpesaPhone: e.target.value})}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                              placeholder="700 000 000"
                              pattern="[0-9]{9}"
                              required
                            />
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            You'll receive a payment request on this number
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Credit Card Option */}
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentData.method === "card" 
                          ? "border-[#A31621] bg-[#fdf3f4]" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setPaymentData({...paymentData, method: "card"})}
                    >
                      <div className="flex items-center">
                        <CreditCard className="text-blue-600 mr-3" size={24} />
                        <div>
                          <h4 className="font-medium text-gray-800">Credit/Debit Card</h4>
                          <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                      
                      {paymentData.method === "card" && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                              </label>
                              <input
                                type="text"
                                value={paymentData.cardDetails.number}
                                onChange={(e) => setPaymentData({
                                  ...paymentData, 
                                  cardDetails: {...paymentData.cardDetails, number: e.target.value}
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                                placeholder="0000 0000 0000 0000"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                value={paymentData.cardDetails.name}
                                onChange={(e) => setPaymentData({
                                  ...paymentData, 
                                  cardDetails: {...paymentData.cardDetails, name: e.target.value}
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                                placeholder="Full Name"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry & CVV
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={paymentData.cardDetails.expiry}
                                  onChange={(e) => setPaymentData({
                                    ...paymentData, 
                                    cardDetails: {...paymentData.cardDetails, expiry: e.target.value}
                                  })}
                                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                                  placeholder="MM/YY"
                                  required
                                />
                                <input
                                  type="text"
                                  value={paymentData.cardDetails.cvv}
                                  onChange={(e) => setPaymentData({
                                    ...paymentData, 
                                    cardDetails: {...paymentData.cardDetails, cvv: e.target.value}
                                  })}
                                  className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#A31621] focus:border-[#A31621] transition-colors"
                                  placeholder="123"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cash on Delivery Option */}
                    {deliveryData.type === "delivery" && (
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentData.method === "cash" 
                            ? "border-[#A31621] bg-[#fdf3f4]" 
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setPaymentData({...paymentData, method: "cash"})}
                      >
                        <div className="flex items-center">
                          <Wallet className="text-orange-600 mr-3" size={24} />
                          <div>
                            <h4 className="font-medium text-gray-800">Cash on Delivery</h4>
                            <p className="text-sm text-gray-600">Pay when your order arrives</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
                    >
                      <ChevronLeft size={20} className="mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isPaymentDataValid()}
                      className="bg-[#A31621] hover:bg-[#8a1220] disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
                    >
                      Review Order
                      <ChevronRight size={20} className="ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4: Order Review & Complete */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
                  Review Your Order
                </h2>
                
                <div className="space-y-6">
                  {/* Personal Details Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <User size={20} className="mr-2 text-[#A31621]" />
                      Personal Details
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Name:</span> {personalData.fullName}</p>
                      <p><span className="font-medium">Email:</span> {personalData.email}</p>
                      <p><span className="font-medium">Phone:</span> +254{personalData.phone}</p>
                      {personalData.alternativePhone && (
                        <p><span className="font-medium">Alt Phone:</span> +254{personalData.alternativePhone}</p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Details Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Truck size={20} className="mr-2 text-[#A31621]" />
                      Delivery Details
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Method:</span> {deliveryData.type === "delivery" ? "Home Delivery" : "Store Pickup"}</p>
                      {deliveryData.type === "delivery" && selectedZone && (
                        <>
                          <p><span className="font-medium">Zone:</span> {selectedZone.name}</p>
                          <p><span className="font-medium">Address:</span> {deliveryData.customAddress}</p>
                          {deliveryData.specificLocation && (
                            <p><span className="font-medium">Location:</span> {deliveryData.specificLocation}</p>
                          )}
                          <p><span className="font-medium">Estimated Time:</span> {selectedZone.estimatedTime}</p>
                          {deliveryData.deliveryInstructions && (
                            <p><span className="font-medium">Instructions:</span> {deliveryData.deliveryInstructions}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Payment Details Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <CreditCard size={20} className="mr-2 text-[#A31621]" />
                      Payment Method
                    </h3>
                    <div className="text-sm text-gray-600">
                      {paymentData.method === "mpesa" && (
                        <p>M-Pesa: +254{paymentData.mpesaPhone}</p>
                      )}
                      {paymentData.method === "card" && (
                        <p>Credit/Debit Card ending in {paymentData.cardDetails.number.slice(-4)}</p>
                      )}
                      {paymentData.method === "cash" && (
                        <p>Cash on Delivery</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
                    >
                      <ChevronLeft size={20} className="mr-2" />
                      Back
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={isProcessing}
                      className="bg-[#A31621] hover:bg-[#8a1220] disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        `Place Order - ${formatCurrency(finalTotal)}`
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                <span className="font-medium">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                  {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
                </span>
              </div>
              {selectedZone && (
                <div className="text-sm text-gray-500">
                  {selectedZone.name} - {selectedZone.estimatedTime}
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                <span>Total</span>
                <span className="text-[#A31621]">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
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
        </div>
      </div>
    </div>
  );
}
