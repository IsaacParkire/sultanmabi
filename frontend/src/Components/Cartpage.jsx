// src/pages/CartPage.jsx

import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-24 font-sans bg-snow min-h-screen">
      <h1 className="text-4xl font-bold text-madder mb-8 tracking-tight">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-artcaffe-md">
          <p className="text-lg text-text-light mb-6">Your cart is currently empty.</p>
          <Link
            to="/products"
            className="inline-block bg-madder hover:bg-madder-dark text-white px-6 py-3 rounded shadow-md transition-transform duration-200 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-card hover:shadow-artcaffe-md transition duration-300 animate-fade-in"
            >
              <div className="flex items-center space-x-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md shadow"
                />
                <div>
                  <h2 className="text-xl font-semibold text-madder">{item.name}</h2>
                  <p className="text-text-light">Price: ${item.price}</p>
                  <p className="text-text-light">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-10 border-t pt-6 gap-4">
            <h2 className="text-2xl font-bold text-madder">
              Total: ${calculateTotal().toFixed(2)}
            </h2>
            <button
              onClick={clearCart}
              className="bg-madder hover:bg-madder-dark text-white px-5 py-3 rounded-lg shadow transition-transform duration-200 transform hover:scale-105"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
