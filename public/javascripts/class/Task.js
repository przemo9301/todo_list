class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTaskToArray(newTask) {
    this.tasks.push(newTask);
  }

  removeTaskFromArray(no) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskIdClass === no) {
        this.tasks.splice(i, 1);
      }
    }
  }

  getTaskFromArray(no) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskIdClass === no) {
        console.log({ i });
        return this.tasks[i];
      }
    }
  }

  showList() {
    return this.tasks;
  }
}
