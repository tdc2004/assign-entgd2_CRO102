// CartContext.js

import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemId, setCartItemId] = useState(null);

  const addToCart = (itemId) => {
    setCartItemId(itemId);
  };

  return (
    <CartContext.Provider value={{ cartItemId, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
