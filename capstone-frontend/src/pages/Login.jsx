import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router';
import { login, signup } from '../services/AuthService';
import { useAuthStore } from '../store/AuthStore';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let data;
            if (isLogin) {
                data = await login(form.email, form.password);
            } else {
                data = await signup(form.name, form.email, form.password);
            }
            setAuth(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='login-page'>
            <div className='login-card'>
                <div className='login-header'>
                    <span className='login-logo'>🌙</span>
                    <h1>Dream Store</h1>
                    <p>{isLogin ? 'Welcome back, dreamer' : 'Begin your dream journey'}</p>
                </div>

                <div className='login-tabs'>
                    <button
                        className={`tab-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <form className='login-form' onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className='form-group'>
                            <label>Name</label>
                            <input
                                type='text'
                                name='name'
                                placeholder='Your name'
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='your@email.com'
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='••••••••'
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className='error-msg'>{error}</p>}

                    <button type='submit' className='submit-btn' disabled={loading}>
                        {loading ? 'Please wait...' : isLogin ? 'Login ✨' : 'Create Account ✨'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;