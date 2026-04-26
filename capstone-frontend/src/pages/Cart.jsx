import React from 'react';
import { useCartStore } from '../store/CartStore';
import { NavLink } from 'react-router';
import { createCheckoutSession } from '../services/StripeService';
import '../styles/cart.css';

const Cart = () => {
  const { items, removeItem, clearCart } = useCartStore();

  const totalPrice = items?.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    try {
      const { url } = await createCheckoutSession(items);
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  if (items.length === 0) {
    return (
      <main className='cart-page'>
        <div className='cart-empty'>
          <span className='cart-empty-icon'>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any dreams yet!</p>
          <NavLink to="/" className='continue-btn'>Explore Dreams </NavLink>
        </div>
      </main>
    );
  }

  return (
    <main className='cart-page'>
      <h1 className='cart-title'>Your Dream Cart 🛒</h1>

      <div className='cart-container'>
        {/* CART ITEMS */}
        <section className='cart-items'>
          {items.map((item, index) => (
            <div key={index} className='cart-item'>
              {item.image && (
                <img src={item.image} alt={item.name} className='cart-item-image' />
              )}
              <div className='cart-item-info'>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
              </div>
              <div className='cart-item-right'>
                <span className='cart-item-price'>
                  ${item.price.toLocaleString()}
                </span>
                <button
                  className='remove-btn'
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ORDER SUMMARY */}
        <section className='cart-summary'>
          <h2>Order Summary</h2>
          <div className='summary-row'>
            <span>Items ({items.length})</span>
            <span>${totalPrice?.toLocaleString()}</span>
          </div>
          <div className='summary-row'>
            <span>Shipping</span>
            <span className='free'>Free </span>
          </div>
          <div className='summary-total'>
            <span>Total</span>
            <span>${totalPrice?.toLocaleString()}</span>
          </div>
          <button className='checkout-btn' onClick={handleCheckout}>
            Proceed to Checkout 💳
          </button>
          <button className='clear-btn' onClick={clearCart}>
            Clear Cart
          </button>
          <NavLink to="/" className='continue-shopping'>
            ← Continue Shopping
          </NavLink>
        </section>
      </div>
    </main>
  );
};

export default Cart;