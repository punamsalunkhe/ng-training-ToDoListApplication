import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskService from './services/TaskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  // page toggle count 
  const tasksPerPage = 5;

  useEffect(() => {
    const loadedTasks = TaskService.getTasks();
    setTasks(loadedTasks);
  }, []);

  const handleNewTask = () => {
    setSelectedTask(null); 
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleSaveTask = (task) => {
    if (selectedTask) {
      TaskService.updateTask(task);
    } else {
      TaskService.addTask(task);
    }
    setTasks(TaskService.getTasks());
    setShowTaskForm(false);
  };

  const handleDeleteConfirm = () => {
    TaskService.deleteTask(selectedTask.id);
    setTasks(TaskService.getTasks());
    setShowDeleteModal(false);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //page toggle manager
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List Application</h1>
      <div className="task-container">
        <div className="button-container">
          <button onClick={handleNewTask}>New Task</button>
          <button onClick={() => setTasks(TaskService.getTasks())}>Refresh</button>
        </div>



        <div className='dataEntryBox'>
          <TaskList
            tasks={currentTasks}  
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>

        {showTaskForm && (
          <TaskForm
            task={selectedTask}
            onSave={handleSaveTask}
            onCancel={() => setShowTaskForm(false)}
          />
        )}

        {showDeleteModal && (
          <div className="delete-task">
            <p>Do you want to delete task {selectedTask?.name}?</p>
            <button onClick={handleDeleteConfirm}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        )}

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
        <div className='totalCount'>Total Tasks: {tasks.length}</div>
      </div>
    </div>
  );
}

export default App;
