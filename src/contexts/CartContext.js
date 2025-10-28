import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, size, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === size
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item with size and quantity
        return [...prevCart, { ...item, size, quantity }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = newQuantity;
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    updateQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
