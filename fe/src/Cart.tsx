import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './style/Cart.css';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.menu_item_id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.menu_item_id)}>Remove</button>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
      <Link to="/menu" className="menu-link">
        <button>Back to Menu</button>
      </Link>
    </div>
  );
};

export default Cart;