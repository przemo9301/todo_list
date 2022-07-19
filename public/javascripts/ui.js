const addBtn = document.querySelector(".addBtn");
const deleteAllBtn = document.querySelector(".deleteAllBtn");
const doneAllBtn = document.querySelector(".doneAllBtn");
const taskListUi = document.querySelector(".tasksList");
const taskText = document.querySelector("#taskToDoText");
const taskPriority = document.querySelector("#taskPriority");
const taskDeadline = document.querySelector("#taskDeadline");
const ulList = document.querySelector(".tasksList");

let flag = true;

const createTaskList = new TaskList();
(async () => {
  const dataFromServer = JSON.parse(await getDataFromServer());
  if (dataFromServer === "" || dataFromServer.length === 0) return null;
  createTaskList.addArray(dataFromServer);
  await deadlineRed();
  createNewTasksList();
})();

const doneAllTasks = async () => {
  const arr = createTaskList.showListFromArray();
  for (let i = 0; i < arr.length; i++) {
    arr[i].taskDoneClass = !arr[i].taskDoneClass;
  }
  console.log(arr);
  createNewTasksList();
  await sendDataToServer(arr);
};

const deleteAllTasks = async () => {
  const data = createTaskList.deleteAllTasksInApp();
  deactivateButton(true);
  createNewTasksList();
  console.log(data);
  await sendDataToServer(data);
};

const taskIsDone = async (e) => {
  const id = Number(e.target.dataset.id);
  const getObjetFromArray = createTaskList.getTaskFromArray(id);
  getObjetFromArray.taskDoneClass = !getObjetFromArray.taskDoneClass;
  createTaskList.sendTaskToArray(id, getObjetFromArray);
  createNewTasksList();
  await sendDataToServer(createTaskList.showListFromArray());
};

const editTaskFromList = (e) => {
  e.preventDefault();
  const id = Number(e.target.dataset.id);
  const getObjetFromArray = createTaskList.getTaskFromArray(id);
  const { taskNameClass, taskPriorityClass, taskDeadlineClass } =
    getObjetFromArray;
  taskDeadline.value = taskDeadlineClass;
  taskPriority.checked = taskPriorityClass;
  taskText.value = taskNameClass;
  addBtn.innerHTML = "Approve changes";
  ulList.classList.add("noHover");
  createTaskList.removeTaskFromArray(id);
  deactivateButton(false);
  flag = false;
};

const removeTaskFromList = async (e) => {
  const id = Number(e.target.dataset.id);
  createTaskList.removeTaskFromArray(id);
  await deadlineRed();
  createNewTasksList();
  await sendDataToServer(createTaskList.showListFromArray());
};

const addTaskToList = async (e) => {
  e.preventDefault();
  const taskTextValue = taskText.value;
  const taskCreationDateValue = new Date().toLocaleString();
  const taskPriorityValue = taskPriority.checked;
  const taskDeadlineValue = taskDeadline.value;
  // if (taskTextValue.length < 5)
  //   return alert("Added task is shorter than 5 characters");
  const newBodyFetch = new TaskToDo(
    createTaskList.getNewCounterForArray(),
    taskTextValue,
    taskPriorityValue,
    taskDeadlineValue,
    taskCreationDateValue,
    false,
    false
  );
  createTaskList.addTaskToArray(newBodyFetch);
  await deadlineRed();
  createNewTasksList();
  clearValuesInFrom();
  await sendDataToServer(createTaskList.showListFromArray());
};

addBtn.addEventListener("click", async (e) => {
  if (addBtn.innerHTML === "Add to list") {
    await addTaskToList(e);
    deactivateButton(false);
  } else if (addBtn.innerHTML === "Approve changes") {
    addBtn.innerHTML = "Add to list";
    ulList.classList.remove("noHover");
    flag = true;
    deactivateButton(false);
    await addTaskToList(e);
  }
});
deleteAllBtn.addEventListener("click", deleteAllTasks);
doneAllBtn.addEventListener("click", doneAllTasks);
