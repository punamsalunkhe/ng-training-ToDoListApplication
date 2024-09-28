import React, { useState, useEffect } from 'react';
import TaskService from './services/TaskService';

const TaskOperation = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage 
  useEffect(() => {
    setTasks(TaskService.getTasks()); 
  }, []);

  // Generate unique Id for new task
  const handleSaveTask = (task) => {
    if (!task.id) {
      task.id = Date.now(); 
    }

    if (selectedTask) {
      TaskService.updateTask(task);
    } else {
      TaskService.addTask(task);
    }
   
     // Update task list
    setTasks(TaskService.getTasks());
    setShowTaskForm(false);
  };

  // Delete task by Id
  const handleDeleteTask = (taskId) => {
    TaskService.deleteTask(taskId); 
    setTasks(TaskService.getTasks()); 
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskOperation;
