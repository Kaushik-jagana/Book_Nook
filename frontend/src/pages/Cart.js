import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                    <div key={index}>
                        <h2>{item.title}</h2>
                        <p>Author: {item.author}</p>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => removeFromCart(item.isbn)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty</p>
            )}
            {cartItems.length > 0 && (
                <Link to="/checkout">
                    <button>Proceed to Buy</button>
                </Link>
            )}
        </div>
    );
};

export default Cart;
