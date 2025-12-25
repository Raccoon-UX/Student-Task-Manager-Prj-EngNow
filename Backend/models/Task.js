const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    // Naya: Task Categorization
    category: { 
        type: String, 
        enum: ['Exams', 'Assignment', 'Personal', 'Lab Work'], 
        default: 'Personal' 
    },
    // Naya: AI suggested sub-tasks store karne ke liye
    subTasks: [{
        text: String,
        isDone: { type: Boolean, default: false }
    }],
    completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);