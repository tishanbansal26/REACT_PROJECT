import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Get user's cart from Firebase
  useEffect(() => {
    if (!currentUser) {
      setCart([]);
      return;
    }

    setLoading(true);
    const cartDocRef = doc(db, 'users', currentUser.uid, 'cart', 'items');

    // Real-time listener for cart changes
    const unsubscribe = onSnapshot(
      cartDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setCart(docSnapshot.data().items || []);
        } else {
          setCart([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error loading cart:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  // Save cart to Firebase
  const saveCartToFirebase = async (cartData) => {
    if (!currentUser) return;

    try {
      const cartDocRef = doc(db, 'users', currentUser.uid, 'cart', 'items');
      await setDoc(cartDocRef, { items: cartData });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (item, size, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === size
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item with size and quantity
        updatedCart = [...prevCart, { ...item, size, quantity }];
      }

      // Save to Firebase
      saveCartToFirebase(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      // Save to Firebase
      saveCartToFirebase(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = newQuantity;
      // Save to Firebase
      saveCartToFirebase(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = async () => {
    setCart([]);
    if (currentUser) {
      try {
        const cartDocRef = doc(db, 'users', currentUser.uid, 'cart', 'items');
        await deleteDoc(cartDocRef);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
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
    updateQuantity,
    loading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
