import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ task, onSave, onCancel }) {

  //This form fields intialize with its value or this form fields are empty for new task
  const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : '');
  const [status, setStatus] = useState(task ? task.status : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const [priority, setPriority] = useState(task ? task.priority : '');
  const [description, setDescription] = useState(task ? task.description : '');
  

  //This error state keeps track of validattion errors
  const [errors, setErrors] = useState({
    assignedTo: false,
    status: false,
    priority: false
  });

  //Handle form submission when save is clicked
  const handleSave = () => {
    // Perform validation for required fields are filled
    let validationErrors = {};

    if (!assignedTo.trim()) validationErrors.assignedTo = true;
    if (!status.trim()) validationErrors.status = true;
    if (!priority.trim()) validationErrors.priority = true;

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; 
    }


    // Create a new task object with the current form values
    const newTask = {
      id: task ? task.id : Date.now(),
      assignedTo,
      status,
      dueDate,
      priority,
      description
    };

    onSave(newTask);
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'New Task'}</h2>

      <div className='inputBox'>
        <label>
          <p className="labelInfo"><span className="required">*</span> <span>Assigned To:</span></p>
        </label>
        <div className='selectInfo'>
          <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
            <option value="">Select User</option>
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
            <option value="User 3">User 3</option>
            <option value="User 4">User 4</option>
          </select>
          {errors.assignedTo && <span className='errorMsg'>Please fill this field</span>}
        </div>
      </div>

      <div className='inputBox'>
        <label>
          <p className="labelInfo"><span className="required">*</span> <span>Status:</span></p>
        </label>
        <div className='selectInfo'>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <span className='errorMsg'>Please fill this field</span>}
        </div>
      </div>

      <div className='inputBox'>
        <label>
          <p className="labelInfo">Due Date:</p>
        </label>
        <div className='selectInfo'>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className='inputBox'>
        <label>
          <p className="labelInfo"><span className="required">*</span><span className="label-text">Priority:</span></p>
        </label>
        <div className='selectInfo'>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <span className='errorMsg'>Please fill this field</span>}
        </div>
      </div>

      <div className='inputBox'>
        <label>
          Description:
        </label>
        <div className='selectInfo'>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default TaskForm;
