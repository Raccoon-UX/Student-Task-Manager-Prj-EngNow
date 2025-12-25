import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; //
import API from '../api/axios';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar'; //
import AddTask from '../components/AddTask';
import StatsChart from '../components/StatsChart'; // Naya Advanced Feature

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext); //
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); //
    const [loading, setLoading] = useState(true);

    // 1. Fetch Tasks logic
    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err.response?.data?.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // 2. Filter Logic for Task Status
    const filteredTasks = tasks.filter(t => {
        if (filter === 'completed') return t.completed;
        if (filter === 'pending') return !t.completed;
        return true;
    });

    if (loading) return <div className="loading">Initializing Dashboard...</div>;

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h2>Welcome, {user?.name} 👋</h2>
                <button onClick={logout} className="logout-btn">Logout</button>
            </header>

            {/* Feature 📊: Visual Analytics */}
            <StatsChart tasks={tasks} />

            {/* Feature ✨: AI-Powered Task Input */}
            <AddTask refresh={fetchTasks} />

            <div className="dashboard-controls">
                {/* PDF Requirement: Filter & Sort Controls */}
                <FilterBar setFilter={setFilter} />
            </div>

            <main className="task-container">
                {filteredTasks.length > 0 ? (
                    <div className="task-grid">
                        {filteredTasks.map(task => (
                            <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No tasks found. Start by adding one with AI suggestions! 🚀</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;