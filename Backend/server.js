// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Ye line .env load karne ke liye zaroori hai
connectDB(); // MongoDB connect check karein

const app = express();

// Middleware: Sirf ek baar CORS use karein
app.use(cors({
  origin: ["https://student-task-manager-prj-eng-now.vercel.app"], // Apna exact Vercel link yahan daalein
  credentials: true
}));

app.use(express.json()); // Body parser

// 🚀 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check
app.get('/api', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server live at http://localhost:${PORT}`));
