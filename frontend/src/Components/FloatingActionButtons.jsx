import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { CartContext } from "../context/CartContext";

export default function FloatingActionButtons() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in your meat products from Sultan Mabi.";
    const whatsappUrl = `https://wa.me/254700123456?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      {/* Cart Button */}
      <motion.button
        onClick={handleCartClick}
        className="relative flex items-center justify-center w-14 h-14 bg-[#102542] text-white rounded-full shadow-lg hover:bg-[#0f1f3a] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {totalItems > 99 ? '99+' : totalItems}
          </motion.div>
        )}
      </motion.button>

      {/* WhatsApp Button */}
      <motion.button
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}