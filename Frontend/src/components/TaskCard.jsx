import React from 'react';
import API from '../api/axios';

const TaskCard = ({ task, refresh }) => {
    // 1. Completion toggle logic
    const toggle = async () => { 
        try {
            await API.put(`/tasks/${task._id}`, { completed: !task.completed }); 
            refresh(); 
        } catch (err) { console.error(err); }
    };

    // 2. Delete logic
    const del = async () => { 
        if(window.confirm("Delete this task?")) { 
            try {
                await API.delete(`/tasks/${task._id}`); 
                refresh(); 
            } catch (err) { console.error(err); }
        } 
    };

    // 3. Overdue Logic: Check if current date is past the due date
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

    // Date formatting
    const displayDate = task.dueDate 
        ? new Date(task.dueDate).toLocaleDateString('en-GB') 
        : 'No Deadline';

    return (
        <div className={`task-card ${task.priority} ${task.completed ? 'done' : ''} ${isOverdue ? 'overdue' : ''}`}>
            <div className="task-main">
                <input type="checkbox" checked={task.completed} onChange={toggle} />
                <div className="task-details">
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                        {/* Priority Levels */}
                        <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                        <span className="task-date">📅 {displayDate}</span>
                        {isOverdue && <span className="overdue-tag">⚠️ Overdue</span>}
                    </div>
                </div>
            </div>
            <button onClick={del} className="delete-btn" title="Delete Task">🗑️</button>
        </div>
    );
};

export default TaskCard;

