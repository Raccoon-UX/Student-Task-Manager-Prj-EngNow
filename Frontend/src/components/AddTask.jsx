import React, { useState } from 'react';
import API from '../api/axios';

const AddTask = ({ refresh }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [aiTips, setAiTips] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    const getSuggestions = async () => {
        if (!title) return alert("Pehle task ka naam likho!");
        setLoadingAI(true);
        try {
            // Check karein ki endpoint sahi hai (/tasks/suggest)
            const { data } = await API.post('/tasks/suggest', { title });
            setAiTips(data.suggestions || []);
        } catch (err) {
            console.error("AI Error:", err);
            alert("AI Suggestion failed. Check Backend/API Key.");
        }
        setLoadingAI(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/tasks', { 
                title, 
                priority, 
                dueDate, 
                subTasks: aiTips.map(t => ({ text: t })) 
            });
            // Reset form
            setTitle('');
            setDueDate('');
            setAiTips([]);
            refresh(); // Dashboard list update karne ke liye
        } catch (err) {
            console.error("Add Task Error:", err);
            alert(err.response?.data?.message || "Task add nahi ho paya");
        }
    };

    return (
        <div className="add-task-container">
            <form className="add-task-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="What is the task?" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="high">High 🔥</option>
                    <option value="medium">Medium ⚡</option>
                    <option value="low">Low ✅</option>
                </select>
                <button type="button" className="ai-btn" onClick={getSuggestions} disabled={loadingAI}>
                    {loadingAI ? 'AI thinking...' : '✨ Get AI Plan'}
                </button>
                <button type="submit" className="submit-btn">Add Task</button>
            </form>
            
            {aiTips.length > 0 && (
                <div className="ai-suggestions">
                    <strong>Steps to complete:</strong>
                    <ul>{aiTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
                </div>
            )}
        </div>
    );
};

export default AddTask;