const addBtn = document.querySelector(".addBtn");
const taskListUi = document.querySelector(".tasksList");
const taskText = document.querySelector("#taskToDoText");
const taskPriority = document.querySelector("#taskPriority");
const taskDeadline = document.querySelector("#taskDeadline");
const listPriorityChecked = document.querySelector(".prioChcked");

let flag = true;

const createTaskList = new TaskList();

const clearValuesInFrom = () => {
  taskDeadline.value = new Date().toISOString();
  taskPriority.checked = false;
  taskText.value = "";
};

(async () => {
  console.log("Powinno się sciągnac cos");
  const dataFromServer = JSON.parse(await getDataFromServer());

  if (dataFromServer === "" || dataFromServer.length === 0) {
    console.log("Retrun null");
    return null;
  }
  console.log("Przesżło przz if ");
  createTaskList.addArray(dataFromServer);
  createNewTasksList();
})();

const taskIsDone = async (e) => {
  const id = Number(e.target.dataset.id);
  console.log("taskis done", id);
  const getObjetFromArray = createTaskList.getTaskFromArray(id);
  console.log(getObjetFromArray);
  getObjetFromArray.taskDoneClass = !getObjetFromArray.taskDoneClass
    ? true
    : false;
  createTaskList.sendTaskToArray(id, getObjetFromArray);
  createNewTasksList();
  await sendDataToServer(createTaskList.showList());
};

const editTaskFromList = (e) => {
  e.preventDefault();
  const id = Number(e.target.dataset.id);
  const getObjetFromArray = createTaskList.getTaskFromArray(id);
  const { taskNameClass, taskPriorityClass, taskDeadlineClass } =
    getObjetFromArray;
  console.log(taskDeadlineClass);
  taskDeadline.value = taskDeadlineClass;
  taskPriority.checked = taskPriorityClass;
  taskText.value = taskNameClass;
  addBtn.innerHTML = "Approve changes";
  createTaskList.removeTaskFromArray(id);
  flag = false;
};

const removeTaskFromList = async (e) => {
  const id = Number(e.target.dataset.id);
  console.log({ id });
  createTaskList.removeTaskFromArray(id);
  createNewTasksList();
  await sendDataToServer(createTaskList.showList());
};

const createNewTasksList = () => {
  taskListUi.innerHTML = "";
  for (const task of createTaskList.showList()) {
    createTask(task);
  }
};

const addTaskToList = async (e) => {
  e.preventDefault();
  const taskTextValue = taskText.value;
  const taskCreationDateValue = new Date().toLocaleString();
  const taskPriorityValue = taskPriority.checked;
  const taskDeadlineValue = taskDeadline.value;
  const newBodyFetch = new TaskToDo(
    createTaskList.getNewCounter(),
    flag ? taskTextValue : taskTextValue + "-Edited",
    taskPriorityValue,
    taskDeadlineValue,
    taskCreationDateValue,
    false,
    false
  );
  createTaskList.addTaskToArray(newBodyFetch);
  createNewTasksList();
  clearValuesInFrom();
  await sendDataToServer(createTaskList.showList());
};

addBtn.addEventListener("click", async (e) => {
  if (addBtn.innerHTML === "Add to list") {
    await addTaskToList(e);
  } else if (addBtn.innerHTML === "Approve changes") {
    addBtn.innerHTML = "Add to list";
    console.log("działa wenwątrz apofove ");
    flag = true;
    await addTaskToList(e);
  }
});
