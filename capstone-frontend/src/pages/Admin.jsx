import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/AuthStore';
import { getProducts } from '../services/ProductService';
import { adminAddProduct, adminDeleteProduct } from '../services/adminService';
import '../styles/admin.css';

const CATEGORIES = ['Wealth', 'Family', 'Lifestyle', 'Career', 'Wellness', 'Health & Beauty'];

const emptyForm = {
    name: '', price: '', description: '',
    image: '', category: 'Lifestyle', inStock: true, stock: 999
};

const Admin = () => {
    const { user, token } = useAuthStore();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await adminAddProduct({ ...form, price: parseFloat(form.price) });
            setMessage('✅ Product added successfully!');
            setForm(emptyForm);
            fetchProducts();
        } catch (err) {
            setMessage('❌ Error adding product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this dream?')) return;
        try {
            await adminDeleteProduct(id);
            setMessage('✅ Product deleted!');
            fetchProducts();
        } catch (err) {
            setMessage('❌ Error deleting product');
        }
    };

    return (
        <main className='admin-page'>
            <h1 className='admin-title'>Admin Dashboard 🛠️</h1>

            {message && <p className='admin-message'>{message}</p>}

            <div className='admin-container'>
                {/* ADD PRODUCT FORM */}
                <section className='admin-form-section'>
                    <h2>Add New Dream</h2>
                    <form className='admin-form' onSubmit={handleAdd}>
                        <div className='form-group'>
                            <label>Name</label>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                placeholder='Dream name'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Price ($)</label>
                            <input
                                type='number'
                                name='price'
                                value={form.price}
                                onChange={handleChange}
                                placeholder='0.00'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Description</label>
                            <textarea
                                name='description'
                                value={form.description}
                                onChange={handleChange}
                                placeholder='Describe this dream...'
                                rows={3}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Image URL (Cloudinary)</label>
                            <input
                                type='text'
                                name='image'
                                value={form.image}
                                onChange={handleChange}
                                placeholder='https://res.cloudinary.com/...'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Category</label>
                            <select
                                name='category'
                                value={form.category}
                                onChange={handleChange}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='admin-btn' disabled={loading}>
                            {loading ? 'Adding...' : 'Add Dream ✨'}
                        </button>
                    </form>
                </section>

                {/* PRODUCTS LIST */}
                <section className='admin-products'>
                    <h2>All Dreams ({products.length})</h2>
                    <div className='admin-product-list'>
                        {products.map((product) => (
                            <div key={product._id} className='admin-product-item'>
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className='admin-product-img'
                                    />
                                )}
                                <div className='admin-product-info'>
                                    <h3>{product.name}</h3>
                                    <p>${product.price.toLocaleString()}</p>
                                    <span className='admin-category'>{product.category}</span>
                                </div>
                                <button
                                    className='admin-delete-btn'
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Admin;