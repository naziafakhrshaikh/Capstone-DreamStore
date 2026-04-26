import React from "react";
import "../styles/Products.css";

const Products = ({ products = [], onAddToCart, onSelectDream }) => {
  return (
    <section className="products-grid">
      {products?.map((product) => (
        <div
          key={product._id}
          className="product-card"
          style={{
            backgroundImage: product.image ? `url(${product.image})` : 'none',
          }}
          onClick={() => onSelectDream && onSelectDream(product)}
        >
          <div className="product-card-overlay">
            <div className="product-top">
              <div className="product-category">
                {product.category}
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
            </div>
            <div className="product-footer">
              <span className="product-price">
                ${product.price.toLocaleString()}
              </span>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart && onAddToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Products;