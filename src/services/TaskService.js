const TaskService = {
  //Get all tassks
  getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  },

  //Add new task
  addTask(task) {
    const tasks = this.getTasks();
    task.id = task.id || Date.now(); 
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },

  //Update a task
  updateTask(task) {
    const tasks = this.getTasks().map(t => (t.id === task.id ? task : t));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },

  //delete a task by Id
  deleteTask(taskId) {
    const tasks = this.getTasks().filter(t => t.id !== taskId); // Remove task by ID
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

export default TaskService;
