class TaskList {
  constructor() {
    this.tasks = [];
  }
  addTaskToArray(newTask) {
    this.tasks.push(newTask);
  }
}

class TaskToDo {
  constructor(orderNum, text, priority, finishData, createData) {
    this.taskIdClass = orderNum;
    this.taskNameClass = text;
    this.taskPriorityClass = priority;
    this.taskDeadlineClass = finishData;
    this.taskCreationDataClass = createData;
  }
}
