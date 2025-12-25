const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Create task
exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create({ ...req.body, userId: req.user.id });
        res.status(201).json(newTask);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task Deleted" });
    } catch (err) { res.status(400).json({ message: err.message }); }
};