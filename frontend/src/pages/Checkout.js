import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const handleCheckout = () => {
    // Simulate checkout process
    alert('Checkout successful!');
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>Price: ${item.price}</p>
        </div>
      ))}
      <button onClick={handleCheckout}>Complete Purchase</button>
    </div>
  );
};

export default Checkout;
