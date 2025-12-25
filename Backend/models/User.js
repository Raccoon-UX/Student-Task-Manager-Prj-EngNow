const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true }); // Isse createdAt aur updatedAt mil jayega [cite: 48]

module.exports = mongoose.model('User', userSchema);