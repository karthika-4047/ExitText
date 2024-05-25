import React, { useState, useEffect } from 'react';
import './style2.css';
import axios from 'axios';

const TodoDash = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get('http://localhost:5000/api/todolist')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleAddTask = () => {
    axios
      .post('http://localhost:5000/api/addtodo', { Task: newTask })
      .then((res) => {
        console.log(res.data.message);
        setNewTask('');
        fetchTasks();
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };

  const handleToggleComplete = async (index) => {
    const task = tasks[index];
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        ...task,
        Status: task.Status === 'completed' ? 'ongoing' : 'completed',
      });
      const updatedTasks = tasks.map((task, i) => (i === index ? response.data : task));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    const task = tasks[index];
    try {
      await axios.delete(`http://localhost:5000/api/remove/${task._id}`);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      alert('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filteredTasks =
    filterOption === 'all'
      ? tasks
      : filterOption === 'completed'
      ? tasks.filter((task) => task.Status === 'completed')
      : tasks.filter((task) => task.Status === 'ongoing');

  return (
    <div className="home">
      <div className="home-content">
        <h1>Make todo list.</h1>
        <div className="filter-options">
          <button
            className={filterOption === 'all' ? 'active' : ''}
            onClick={() => setFilterOption('all')}
          >
            All
          </button>
          <button
            className={filterOption === 'completed' ? 'active' : ''}
            onClick={() => setFilterOption('completed')}
          >
            Completed
          </button>
          <button
            className={filterOption === 'ongoing' ? 'active' : ''}
            onClick={() => setFilterOption('ongoing')}
          >
            Incomplete
          </button>
        </div>
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a task."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <div className="task-list">
          {filteredTasks.map((task, index) => (
            <div key={index} className={`task ${task.Status === 'completed' ? 'completed' : ''}`}>
              <span>{task.Task}</span>
              <div className="task-actions">
                <button onClick={() => handleToggleComplete(index)}>
                  <i className="fas fa-check"></i>
                </button>
                <button onClick={() => handleDeleteTask(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoDash;