const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Yeh raha woh "protect" function jo missing tha
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Header se token nikaalo
            token = req.headers.authorization.split(' ')[1];

            // Token verify karo
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User ko database mein dhoondo (password chhod kar)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Agle step (controller) par jao
        } catch (error) {
            console.error("Auth Error:", error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect }; // Ab ye sahi kaam karega