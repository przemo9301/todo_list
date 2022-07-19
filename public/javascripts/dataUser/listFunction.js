const createTask = (newBodyFromUI) => {
  const {
    taskIdClass,
    taskNameClass,
    taskPriorityClass,
    taskDeadlineClass,
    taskCreationDataClass,
    taskDoneClass,
    taskMeetDeadline,
  } = newBodyFromUI;

  const newLi = document.createElement("li");
  taskPriorityClass ? newLi.classList.add("checkedTrue") : null;
  taskDoneClass
    ? newLi.classList.add("greenDone")
    : newLi.classList.remove("greenDone");

  const newText = document.createElement("text");
  newText.innerText = taskNameClass;

  const newDeadlineDate = document.createElement("deadline-date");
  newDeadlineDate.innerText =
    taskDeadlineClass !== ""
      ? new Date(taskDeadlineClass).toLocaleString()
      : "No deadline";

  if (taskMeetDeadline) {
    newLi.classList.add("redMeetDeadline");
  }

  const newInputCheckbox = document.createElement("input");
  newInputCheckbox.setAttribute("type", "checkbox");
  newInputCheckbox.classList.add("prioChecked");
  newInputCheckbox.checked = false;
  newInputCheckbox.disabled = true;
  newInputCheckbox.style.width = "30px";
  newInputCheckbox.style.height = "30px";

  const newInputCheckboxChecked = document.createElement("input");
  newInputCheckboxChecked.setAttribute("type", "checkbox");
  newInputCheckboxChecked.checked = true;
  newInputCheckboxChecked.disabled = true;
  newInputCheckboxChecked.classList.add("activeCheck", "prioChecked");
  newInputCheckboxChecked.style.width = "30px";
  newInputCheckboxChecked.style.height = "30px";
  newInputCheckboxChecked.style.backgroundColor = "rgba(0, 0, 255, 0.5)";

  const newPriority = document.createElement("prio");
  taskPriorityClass
    ? newPriority.appendChild(newInputCheckboxChecked)
    : newPriority.appendChild(newInputCheckbox);

  const newDate = document.createElement("create-date");
  newDate.innerText = taskCreationDataClass;

  const createNewDiv = document.createElement("div");
  createNewDiv.classList.add("buttonDiv");
  //Checkbox
  const doneCheckbox = document.createElement("input");
  doneCheckbox.setAttribute("type", "checkbox");
  doneCheckbox.dataset.id = taskIdClass;
  doneCheckbox.classList.add("checkDone");
  doneCheckbox.addEventListener("change", taskIsDone);
  doneCheckbox.checked = taskDoneClass;
  //Button Delete
  const newButtonDelete = document.createElement("button");
  newButtonDelete.classList.add("btnDelete");
  newButtonDelete.dataset.id = taskIdClass;
  newButtonDelete.dataset.priority = taskPriorityClass;
  newButtonDelete.innerText = "Delete";
  newButtonDelete.addEventListener("click", removeTaskFromList);
  // Button edit
  const newButtonEdit = document.createElement("button");
  newButtonEdit.classList.add("btnEdit");
  newButtonEdit.dataset.id = taskIdClass;
  newButtonEdit.dataset.priority = taskPriorityClass;
  newButtonEdit.innerText = "Edit";
  newButtonEdit.disabled = taskDoneClass;
  taskDoneClass
    ? newButtonEdit.classList.add("noHover")
    : newButtonEdit.classList.remove("noHover");
  newButtonEdit.addEventListener("click", editTaskFromList);

  const newBr = document.createElement("br");
  //Create li
  newLi.appendChild(newText);
  newLi.appendChild(newDeadlineDate);
  newLi.appendChild(newDate);
  newLi.appendChild(newPriority);
  newLi.appendChild(newBr);
  createNewDiv.appendChild(newButtonEdit);
  createNewDiv.appendChild(newButtonDelete);
  newLi.appendChild(createNewDiv);
  newLi.appendChild(doneCheckbox);

  ulList.appendChild(newLi);
};
const clearValuesInFrom = () => {
  taskDeadline.value = "";
  taskPriority.checked = false;
  taskText.value = "";
};

const createNewTasksList = () => {
  taskListUi.innerHTML = "";
  for (const task of createTaskList.showListFromArray()) {
    createTask(task);
  }
};

const deactivateButton = (data) => {
  deleteAllBtn.disabled = data;
  deleteAllBtn.classList.toggle("noHover");
  doneAllBtn.disabled = data;
  doneAllBtn.classList.toggle("noHover");
};
