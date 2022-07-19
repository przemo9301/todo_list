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

  sendTaskToArray(no, object) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskIdClass === no) {
        this.tasks[i] = object;
        console.log({ i, no });
        console.log(object);
      }
    }
  }

  showList() {
    return this.tasks;
  }

  addArray(arrayFromServer) {
    this.tasks = arrayFromServer;
  }

  getNewCounter() {
    const arrayLength = this.tasks.length;
    if (arrayLength === 0) return 1;
    let counter = this.tasks[arrayLength - 1].taskIdClass;
    counter++;
    return counter;
  }
}
