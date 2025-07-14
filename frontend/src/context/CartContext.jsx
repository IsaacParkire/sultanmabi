// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart with localStorage data
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return []; // SSR safety
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total items in cart
  const totalItems = useMemo(() => (
    cartItems.reduce((total, item) => total + item.quantity, 0)
  ), [cartItems]);

  // Calculate total price of all items
  const totalPrice = useMemo(() => (
    cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    ).toFixed(2) // Fixed to 2 decimal places
  ), [cartItems]);

  // Add item to cart (default quantity 1)
  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Increment item quantity by 1
  const incrementQuantity = useCallback((productId) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  }, []);

  // Decrement item quantity by 1 (remove if reaches 0)
  const decrementQuantity = useCallback((productId) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity - 1;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) // Remove nulled items
    );
  }, []);

  // Remove item completely from cart
  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Clear all items from cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Context value object
  const contextValue = useMemo(() => ({
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart
  }), [cartItems, totalItems, totalPrice, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);