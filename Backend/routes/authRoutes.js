const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Signup Route (POST /api/auth/signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Password encrypt karo
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered!" });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// 2. Login Route (POST /api/auth/login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Login successful, JWT token generate karo
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token, user: { id: user._id, name: user.name } });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;