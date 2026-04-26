import React, { useEffect } from 'react';
import { NavLink } from 'react-router';
import { useCartStore } from '../store/CartStore';
import '../styles/success.css';

const Success = () => {
    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <main className='success-page'>
            <div className='success-card'>
                <span className='success-icon'>✨</span>
                <h1>Dream Purchased!</h1>
                <p>Your dream is about to be fulfilled. Thank you for dreaming with us!</p>
                <NavLink to="/" className='success-btn'>
                    Shop More Dreams
                </NavLink>
            </div>
        </main>
    );
};

export default Success;