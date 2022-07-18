class TaskToDo {
  constructor(orderNum, text, priority, finishData, createData, taskDone) {
    this.taskIdClass = orderNum;
    this.taskNameClass = text;
    this.taskPriorityClass = priority;
    this.taskDeadlineClass = finishData;
    this.taskCreationDataClass = createData;
    this.taskDoneClass = taskDone;
  }
}
