import React, { createContext, useState } from 'react';
import axios from 'axios';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems([...cartItems, book]);
  };

  const removeFromCart = (isbn) => {
    setCartItems(cartItems.filter(item => item.isbn !== isbn));
  };

  const purchaseItems = async () => {
    try {
      const purchasePromises = cartItems.map(item =>
        axios.post('http://localhost:3000/api/purchases/purchase', {
          isbn: item.isbn,
          quantity: 1 // Assuming 1 for simplicity; you can modify to handle multiple quantities
        })
      );

      await Promise.all(purchasePromises);
      alert('Purchase successful!');
      setCartItems([]); // Clear cart after purchase
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('There was an issue processing your purchase.');
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,purchaseItems }}>
      {children}
    </CartContext.Provider>
  );
};
