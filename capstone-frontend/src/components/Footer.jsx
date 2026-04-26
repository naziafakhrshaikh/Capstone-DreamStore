import React from 'react'
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='footer'>
      <p>✦ Dream Store © {currentYear} · Where Dreams Come True ✦</p>
    </footer>
  )
}

export default Footer