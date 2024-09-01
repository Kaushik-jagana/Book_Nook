import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems,purchaseItems } = useContext(CartContext);

  const handlePurchase = () => {
    purchaseItems();
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <p>Author: {item.author}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
          <button onClick={handlePurchase}>Complete Purchase</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Checkout;
