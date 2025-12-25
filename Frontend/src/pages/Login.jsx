import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Link import kiya
import API from '../api/axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', formData);
            login(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="auth-container">
            <h2>Welcome Back! 👋</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="submit">Login</button>
            </form>
            {/* Clickable Link yahan hai */}
            <p style={{ marginTop: '15px' }}>
                New user? <Link to="/signup" className="auth-link">Create an account</Link>
            </p>
        </div>
    );
};

export default Login;