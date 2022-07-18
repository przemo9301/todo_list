const ulList = document.querySelector(".tasksList");
const createTask = (newBodyFromUI) => {
  const {
    taskIdClass,
    taskNameClass,
    taskPriorityClass,
    taskDeadlineClass,
    taskCreationDataClass,
  } = newBodyFromUI;
  console.log(typeof taskDeadlineClass);

  const newLi = document.createElement("li");
  taskPriorityClass ? newLi.classList.add("checkedTrue") : null;

  const newText = document.createElement("text");
  newText.innerText = taskNameClass;

  const newDeadlineDate = document.createElement("deadline-date");
  newDeadlineDate.innerText =
    taskDeadlineClass !== ""
      ? new Date(taskDeadlineClass).toLocaleString()
      : "No deadline";

  const newInputCheckbox = document.createElement("input");
  newInputCheckbox.setAttribute("type", "checkbox");
  newInputCheckbox.classList.add("prioChecked");
  newInputCheckbox.checked = false;
  newInputCheckbox.style.width = "30px";
  newInputCheckbox.style.height = "30px";

  const newInputCheckboxChecked = document.createElement("input");
  newInputCheckboxChecked.setAttribute("type", "checkbox");
  newInputCheckboxChecked.checked = true;
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

  const doneCheckbox = document.createElement("input");
  doneCheckbox.setAttribute("type", "checkbox");
  doneCheckbox.classList.add("checkDone");

  const newButtonDelete = document.createElement("button");
  newButtonDelete.classList.add("btnDelete");
  newButtonDelete.dataset.id = taskIdClass;
  newButtonDelete.dataset.priority = taskPriorityClass;
  newButtonDelete.innerText = "Delete";
  newButtonDelete.addEventListener("click", removeTaskFromList);

  const newButtonEdit = document.createElement("button");
  newButtonEdit.classList.add("btnEdit");
  newButtonEdit.dataset.id = taskIdClass;
  newButtonEdit.dataset.priority = taskPriorityClass;
  newButtonEdit.innerText = "Edit";
  newButtonEdit.addEventListener("click", editTaskFromList);
  // Future idea
  // const newButtonUp = document.createElement("button");
  // newButtonUp.classList.add("btn-up");
  // newButtonUp.dataset.id = id;
  // newButtonUp.dataset.priority = priority;
  // newButtonUp.innerText = "Up";
  // newButtonUp.addEventListener("click", () => {
  //   console.log("Up");
  // });

  // const newButtonDown = document.createElement("button");
  // newButtonDown.classList.add("btn-down");
  // newButtonDown.dataset.id = id;
  // newButtonDown.dataset.priority = priority;
  // newButtonDown.innerText = "Down";
  // newButtonDown.addEventListener("click", () => {
  //   console.log("Down");
  // });

  //I do <br>
  const newBr = document.createElement("br");

  newLi.appendChild(newText);
  newLi.appendChild(newDeadlineDate);
  newLi.appendChild(newDate);
  newLi.appendChild(newPriority);
  newLi.appendChild(newBr);
  createNewDiv.appendChild(newButtonEdit);
  createNewDiv.appendChild(newButtonDelete);
  newLi.appendChild(createNewDiv);
  newLi.appendChild(doneCheckbox);
  // newLi.appendChild(newButtonUp);
  // newLi.appendChild(newButtonDown);

  ulList.appendChild(newLi);
};

const sendDataToServer = async (sendInfoByBody) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify(sendInfoByBody),
  };
  const sendData = await fetch("http://localhost:3100/send/", options);
  const data = await sendData.json();
};
