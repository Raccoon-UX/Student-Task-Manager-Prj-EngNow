const express = require('express');
const router = express.Router();

// Controllers import
const taskCtrl = require('../controllers/taskController');
const aiCtrl = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// Debugging ke liye (Optional): Inhe console karke dekh sakte hain agar error aaye
// console.log("Check:", taskCtrl.getTasks); 

// Routes Setup
router.route('/')
    .get(protect, taskCtrl.getTasks)
    .post(protect, taskCtrl.createTask);

router.route('/:id')
    .put(protect, taskCtrl.updateTask)
    .delete(protect, taskCtrl.deleteTask);

// AI Suggestions
router.post('/suggest', protect, aiCtrl.getAISuggestions);

module.exports = router;