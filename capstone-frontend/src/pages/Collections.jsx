import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductService';
import { useCartStore } from '../store/CartStore';
import '../styles/collections.css';

const CATEGORIES = ['Wealth', 'Family', 'Lifestyle', 'Career', 'Wellness', 'Health & Beauty'];

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [selectedDream, setSelectedDream] = useState(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedDream(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className='collections-page'>
      <h1 className='collections-title'>Collections</h1>
      <p className='collections-subtitle'>Browse dreams by category</p>

      {CATEGORIES.map(category => {
        const categoryProducts = products.filter(p => p.category === category);
        if (categoryProducts.length === 0) return null;

        return (
          <section key={category} className='collection-section'>
            <h2 className='collection-category-title'>{category}</h2>
            <div className='collection-grid'>
              {categoryProducts.map(product => (
                <div
                  key={product._id}
                  className='collection-card'
                  onClick={() => setSelectedDream(product)}
                  style={{
                    backgroundImage: product.image ? `url(${product.image})` : 'none',
                  }}
                >
                  <div className='collection-card-overlay'>
                    <h3>{product.name}</h3>
                    <span>${product.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* MODAL — same as Dreams & Home */}
      {selectedDream && (
        <div className='dream-modal-overlay' onClick={() => setSelectedDream(null)}>
          <div className='dream-modal' onClick={(e) => e.stopPropagation()}>
            <button className='dream-modal-close' onClick={() => setSelectedDream(null)}>✕</button>
            <div className='dream-modal-image'>
              {selectedDream.image ? (
                <img src={selectedDream.image} alt={selectedDream.name} />
              ) : (
                <div className='dream-modal-no-image'>✨</div>
              )}
            </div>
            <div className='dream-modal-details'>
              <span className='dream-modal-category'>{selectedDream.category}</span>
              <h2 className='dream-modal-title'>{selectedDream.name}</h2>
              <p className='dream-modal-description'>{selectedDream.description}</p>
              <div className='dream-modal-footer'>
                <span className='dream-modal-price'>
                  ${selectedDream.price.toLocaleString()}
                </span>
                <button
                  className='dream-modal-btn'
                  onClick={() => {
                    addItem(selectedDream);
                    setSelectedDream(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Collections;