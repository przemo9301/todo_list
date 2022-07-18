const addBtn = document.querySelector(".addBtn");
const taskListUi = document.querySelector(".tasksList");
const taskText = document.querySelector("#taskToDoText");
const taskPriority = document.querySelector("#taskPriority");
const taskDeadline = document.querySelector("#taskDeadline");
const listPriorityChecked = document.querySelector(".prioChcked");

let counter = 0;

const createTaskList = new TaskList();

const clearValuesInFrom = () => {
  taskDeadline.value = new Date().toISOString();
  taskPriority.checked = false;
  taskText.value = "";
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
  // removeTaskFromList(e);
  // createTaskList.removeTaskFromArray(id);
  // createNewTasksList();
  // createTaskList.sendEditedObjectToArray(id, getObjetFromArray);
};

const removeTaskFromList = (e) => {
  const id = Number(e.target.dataset.id);
  console.log({ id });
  createTaskList.removeTaskFromArray(id);
  createNewTasksList();
};

const createNewTasksList = () => {
  taskListUi.innerHTML = "";
  for (const task of createTaskList.showList()) {
    createTask(task);
  }
};

const addTaskToList = async (e) => {
  e.preventDefault();
  counter++;
  console.log("działa");
  const taskTextValue = taskText.value;
  const taskCreationDateValue = new Date().toLocaleString();
  const taskPriorityValue = taskPriority.checked;
  const taskDeadlineValue = taskDeadline.value;
  const newBodyFetch = new TaskToDo(
    counter,
    taskTextValue,
    taskPriorityValue,
    taskDeadlineValue,
    taskCreationDateValue
  );
  createTaskList.addTaskToArray(newBodyFetch);
  console.log(createTaskList.showList());
  // createTask(newBodyFetch);
  createNewTasksList();
  await sendDataToServer(newBodyFetch);
  clearValuesInFrom();
};

addBtn.addEventListener("click", async (e) => {
  if (addBtn.innerHTML === "Add to list") {
    await addTaskToList(e);
  } else if (addBtn.innerHTML === "Approve changes") {
    addBtn.innerHTML = "Add to list";
    console.log("działa wenwątrz apofove ");
    await addTaskToList(e);
  }
});

listPriorityChecked.addEventListener("change", () => {
  listPriorityChecked.classList.toggle("activeCheck");
  console.log("dziła inpu active checked ");
});
