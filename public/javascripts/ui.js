const addBtn = document.querySelector(".addBtn");
const deleteAllBtn = document.querySelector(".deleteAllBtn");
const doneAllBtn = document.querySelector(".doneAllBtn");
const taskListUi = document.querySelector(".tasksList");
const taskText = document.querySelector("#taskToDoText");
const taskPriority = document.querySelector("#taskPriority");
const taskDeadline = document.querySelector("#taskDeadline");
const ulList = document.querySelector(".tasksList");

let flagAddBtn = true;
let flagDoneBtn = true;

const createTaskList = new TaskList();

const validationOfAllDone = () => {
  let counter = 0;
  const arr = createTaskList.showListFromArray();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].taskDoneClass) counter++;
  }
  if (counter === arr.length) {
    doneAllBtn.innerText = "All not done";
  } else {
    doneAllBtn.innerText = "All done";
  }
};

const doneAllTasks = async () => {
  const arr = createTaskList.showListFromArray();
  if (flagDoneBtn) {
    flagDoneBtn = !flagDoneBtn;
    for (let i = 0; i < arr.length; i++) {
      arr[i].taskDoneClass = true;
    }
    doneAllBtn.innerText = "All not done";
  } else {
    flagDoneBtn = !flagDoneBtn;
    for (let i = 0; i < arr.length; i++) {
      arr[i].taskDoneClass = false;
    }
    doneAllBtn.innerText = "All done";
  }
  createNewTasksList();
  validationOfAllDone();
  await sendDataToServer(arr);
};

const deleteAllTasks = async () => {
  const data = createTaskList.deleteAllTasksInApp();
  deactivateButton(true, "add");
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
  validationOfAllDone();
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
  addBtn.innerText = "Approve changes";
  ulList.classList.add("noHover");
  createTaskList.removeTaskFromArray(id);
  deactivateButton(false, "add");
  flagAddBtn = false;
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
  if (taskTextValue.length < 5)
    return alert("Added task is shorter than 5 characters");
  if (new Date() > new Date(taskDeadlineValue)) {
    return alert("Deadline has already passed ");
  }
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
  if (addBtn.innerText === "Add to list") {
    await addTaskToList(e);
    deactivateButton(false, "remove");
  } else if (addBtn.innerText === "Approve changes") {
    addBtn.innerText = "Add to list";
    ulList.classList.remove("noHover");
    flagAddBtn = true;
    deactivateButton(false, "remove");
    await addTaskToList(e);
  }
});
deleteAllBtn.addEventListener("click", deleteAllTasks);
doneAllBtn.addEventListener("click", doneAllTasks);

(async () => {
  const dataFromServer = JSON.parse(await getDataFromServer());
  dataFromServer.length
    ? deactivateButton(false, "remove")
    : deactivateButton(true, "add");
  if (dataFromServer === "" || dataFromServer.length === 0) return null;
  createTaskList.addArray(dataFromServer);
  await deadlineRed();
  createNewTasksList();
})();
