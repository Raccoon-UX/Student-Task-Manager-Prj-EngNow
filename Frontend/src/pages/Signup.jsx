import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/signup', formData);
            alert("Registration Successful! Now Login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account 🎓</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name" required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="submit">Sign Up</button>
            </form>
            <p style={{ marginTop: '15px' }}>
                Already have an account? <Link to="/login" className="auth-link">Login</Link>
            </p>
        </div>
    );
};

export default Signup;