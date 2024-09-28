import React from 'react';

//Display a list of task in table format
function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          //use task.id as a unique key for each row
          <tr key={task.id}>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.description}</td>
            {/* Actions button for each task*/ }
            <td>
              <button className='editInfo' onClick={() => onEdit(task)}>Edit</button>
              <button className='delInfo' onClick={() => onDelete(task)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
