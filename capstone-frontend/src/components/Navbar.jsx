import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useCartStore } from '../store/CartStore';
import { useAuthStore } from '../store/AuthStore';
import '../styles/navbar.css';

const Navbar = () => {
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const totalPrice = items?.reduce((total, item) => total + item.price, 0);
  const itemCount = items?.length || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar'>

      {/* LEFT - LOGO */}
      <div className='logo'>
        <h1>Dream Store</h1>
        <p className='tagline'>Dream It. Own It.</p>
      </div>

      {/* CENTER - NAV LINKS */}
      <div className='nav-links-container'>
        <NavLink to="/" className='nav-link'>Home</NavLink>
        <NavLink to="/suggest-dream" className='nav-link'>Dreams</NavLink>
        <NavLink to="/collections" className='nav-link'>Collections</NavLink>
        <NavLink to="/about" className='nav-link'>About</NavLink>
      </div>

      {/* RIGHT - AUTH + CART */}
      <div className='nav-actions'>
        {user ? (
          <>
            <span className='nav-user'>👤 {user.name}</span>
            {user.role === 'admin' && (
              <NavLink to="/admin" className='nav-link'>Admin</NavLink>
            )}
            <button className='logout-btn' onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className='nav-link login-btn'>
            Login
          </NavLink>
        )}
        <NavLink to="/cart" className='nav-link cart'>
          🛒 {itemCount} | ${totalPrice?.toLocaleString() || '0'}
        </NavLink>
      </div>

    </nav>
  );
};

export default Navbar;