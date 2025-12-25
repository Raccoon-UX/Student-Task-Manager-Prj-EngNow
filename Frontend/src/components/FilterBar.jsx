import React from 'react'; // Yeh line zaroori hai error hatane ke liye

const FilterBar = ({ setFilter }) => {
    return (
        <div className="filter-bar" style={{ marginBottom: '20px', padding: '10px', background: '#f4f4f4', borderRadius: '5px' }}>
            <label htmlFor="status-filter" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                Filter Tasks: 
            </label>
            <select 
                id="status-filter"
                onChange={(e) => setFilter(e.target.value)}
                style={{ padding: '5px', borderRadius: '4px', cursor: 'pointer' }}
            >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default FilterBar;