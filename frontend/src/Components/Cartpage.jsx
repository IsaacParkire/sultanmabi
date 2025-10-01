import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, ChevronLeft, ShoppingBag, X, Check, Heart, Tag, Star, Gift, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, clearCart, cartTotal, cartCount } = useCart();
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Format currency as Kenyan Shillings
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Save item for later
  const saveForLater = (item) => {
    setSavedItems([...savedItems, item]);
    removeFromCart(item.id);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  // Move item back to cart
  const moveToCart = (item) => {
    setSavedItems(savedItems.filter(saved => saved.id !== item.id));
    // Add back to cart logic would go here
  };

  // Apply promo code
  const applyPromoCode = () => {
    const validCodes = {
      'WELCOME10': 10,
      'MEAT20': 20,
      'FRESH15': 15
    };
    
    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  // Calculate discounted total
  const discountedTotal = cartTotal - (cartTotal * discount / 100);

  // Toggle item selection for bulk actions
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Remove selected items
  const removeSelectedItems = () => {
    selectedItems.forEach(itemId => removeFromCart(itemId));
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  // Recommended products (mock data)
  const recommendedProducts = [
    { id: 1, name: "Quality Beef Steak", price: 800, image: "/images/products/beef-steak.jpg" },
    { id: 2, name: "Fresh Chicken Breast", price: 600, image: "/images/products/chicken-breast.jpg" },
    { id: 3, name: "Lamb Chops", price: 1200, image: "/images/products/lamb-chops.jpg" },
  ];

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
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/products" className="flex items-center text-[#102542] hover:text-[#A31621] transition-colors mr-6">
            <ChevronLeft className="mr-1" size={20} />
            Continue Shopping
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">
            Shopping Cart
            {cartCount > 0 && <span className="text-[#A31621] ml-2">({cartCount})</span>}
          </h1>
        </div>
        
        {cartItems.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {showBulkActions ? "Cancel Selection" : "Select Items"}
            </button>
            {showBulkActions && selectedItems.length > 0 && (
              <button
                onClick={removeSelectedItems}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Remove Selected ({selectedItems.length})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Success Messages */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg flex items-center"
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
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b font-medium text-gray-600">
                {showBulkActions && <div className="col-span-1">Select</div>}
                <div className={showBulkActions ? "col-span-4" : "col-span-5"}>Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 p-4 md:p-6 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    {showBulkActions && (
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="rounded border-gray-300 text-[#A31621] focus:ring-[#A31621]"
                        />
                      </div>
                    )}
                    
                    <div className={`${showBulkActions ? "col-span-11 md:col-span-4" : "col-span-12 md:col-span-5"} flex items-center`}>
                      <div className="relative group">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border mr-4"
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-[#A31621] transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 hover:text-[#A31621] transition-colors cursor-pointer">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{item.weight || '200g'}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center mr-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className={i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"} />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                          </div>
                          <button
                            onClick={() => saveForLater(item)}
                            className="text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                          >
                            <Heart size={12} className="mr-1" />
                            Save for later
                          </button>
                        </div>
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

            {/* Saved for Later Section */}
            {savedItems.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-blue-50 border-b">
                  <h3 className="font-medium text-blue-800 flex items-center">
                    <Heart className="mr-2" size={18} />
                    Saved for Later ({savedItems.length})
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                        <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded mb-2" />
                        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                        <p className="text-[#A31621] font-semibold text-sm mb-2">{formatCurrency(item.price)}</p>
                        <button
                          onClick={() => moveToCart(item)}
                          className="w-full bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recommended Products */}
            <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="font-medium text-gray-800 flex items-center">
                  <Users className="mr-2" size={18} />
                  Customers Also Bought
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow group cursor-pointer">
                      <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded mb-2 group-hover:scale-105 transition-transform" />
                      <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                      <p className="text-[#A31621] font-semibold text-sm mb-2">{formatCurrency(product.price)}</p>
                      <button className="w-full bg-[#A31621] text-white py-1 px-2 rounded text-xs hover:bg-[#8a1220] transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              Order Summary
            </h2>

            {/* Promo Code Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-3">
                <Tag className="text-green-600 mr-2" size={16} />
                <span className="font-medium text-sm">Have a promo code?</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#A31621]/50 focus:border-[#A31621]"
                  disabled={promoApplied}
                />
                <button
                  onClick={applyPromoCode}
                  disabled={promoApplied || !promoCode}
                  className="px-4 py-2 bg-[#A31621] text-white rounded text-sm hover:bg-[#8a1220] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <Check size={14} className="mr-1" />
                  {discount}% discount applied!
                </div>
              )}
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                <span className="font-medium">{formatCurrency(cartTotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-{formatCurrency(cartTotal * discount / 100)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-green-600">
                  {cartTotal >= 2000 ? "FREE" : formatCurrency(150)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                <span>Total</span>
                <span className="text-[#A31621]">
                  {formatCurrency(discountedTotal + (cartTotal >= 2000 ? 0 : 150))}
                </span>
              </div>
              {cartTotal < 2000 && (
                <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                  Add {formatCurrency(2000 - cartTotal)} more for free delivery!
                </div>
              )}
            </div>              
              <Link
              to="/checkout"
              className="block w-full bg-[#A31621] hover:bg-[#8a1220] text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-300 shadow-md mb-4"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="block w-full bg-white border-2 border-[#A31621] text-[#A31621] text-center py-2 px-4 rounded-lg font-medium hover:bg-[#A31621] hover:text-white transition-colors duration-300 mb-4"
            >
              Continue Shopping
            </Link>
            
            <div className="text-center mb-4">
              <div className="flex items-center justify-center text-green-600 text-sm mb-2">
                <Check size={16} className="mr-1" />
                <span>Secure SSL Encryption</span>
              </div>
              <p className="text-gray-500 text-xs">
                Your payment information is protected with 256-bit SSL encryption
              </p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Gift className="mr-2" size={16} />
                Payment Methods
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs font-medium text-center">M-Pesa</div>
                <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs font-medium text-center">Visa</div>
                <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs font-medium text-center">MasterCard</div>
                <div className="bg-gray-100 border rounded-md px-3 py-2 text-xs font-medium text-center">Airtel Money</div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-sm text-gray-600 mb-2">Need help?</p>
              <div className="flex justify-center gap-4 text-xs">
                <a href="tel:+254700000000" className="text-[#A31621] hover:underline">Call Us</a>
                <a href="/chat" className="text-[#A31621] hover:underline">Live Chat</a>
                <a href="/faq" className="text-[#A31621] hover:underline">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}