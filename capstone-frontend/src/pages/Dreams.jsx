import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductService';
import { useCartStore } from '../store/CartStore';
import { useNavigate } from 'react-router';
import '../styles/dreams.css';

const Dreams = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [search, setSearch] = useState('');
    const [selectedDream, setSelectedDream] = useState(null);
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFiltered(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Sort function
    useEffect(() => {
        let result = [...products];

        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sortBy === 'az') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'za') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === 'low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'high') {
            result.sort((a, b) => b.price - a.price);
        }

        setFiltered(result);
    }, [activeCategory, sortBy, search, products]);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedDream(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <main className='dreams-page'>
            <h1 className='dreams-title'>All Dreams ✨</h1>

            {/* SEARCH + SORT BAR */}
            <div className='dreams-controls'>
                <input
                    type='text'
                    placeholder='Search dreams...'
                    className='dreams-search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className='dreams-sort'
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value='default'>Sort By</option>
                    <option value='az'>Name: A → Z</option>
                    <option value='za'>Name: Z → A</option>
                    <option value='low'>Price: Low → High</option>
                    <option value='high'>Price: High → Low</option>
                </select>
            </div>

            {/* CATEGORY FILTER */}
            <div className='dreams-categories'>
                {['All', 'Wealth', 'Family', 'Lifestyle', 'Career', 'Wellness', 'Health & Beauty'].map(cat => (
                    <div
                        key={cat}
                        className={`dream-bubble ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </div>
                ))}
            </div>

            {/* RESULTS COUNT */}
            <p className='dreams-count'>
                Showing {filtered.length} dream{filtered.length !== 1 ? 's' : ''}
            </p>

            {/* PRODUCT LIST */}
            <div className='dreams-list'>
                {filtered.length === 0 ? (
                    <p className='dreams-empty'>No dreams found 🌙</p>
                ) : (
                    filtered.map((product) => (
                        <div key={product._id} className='dream-row'>
                            <div
                                className='dream-row-image clickable'
                                onClick={() => setSelectedDream(product)}
                                title='Click to enlarge'
                            >
                                {product.image ? (
                                    <img src={product.image} alt={product.name} />
                                ) : (
                                    <div className='dream-row-no-image'>✨</div>
                                )}
                                <div className='dream-row-image-overlay'>🔍</div>
                            </div>
                            <div className='dream-row-info'>
                                <span className='dream-row-category'>{product.category}</span>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                            </div>
                            <div className='dream-row-actions'>
                                <span className='dream-row-price'>
                                    ${product.price.toLocaleString()}
                                </span>
                                <button
                                    className='dream-row-btn'
                                    onClick={() => addItem(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL */}
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

export default Dreams;