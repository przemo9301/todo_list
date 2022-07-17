const addBtn = document.querySelector(".addBtn");
const taskText = document.querySelector("#taskToDoText");
const taskPriority = document.querySelector("#taskPriority");
const taskDeadline = document.querySelector("#taskDeadline");

const autoDownload = () => {
  console.log("autoDownload ");
};

addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("działa");
  const taskTextValue = taskText.value;
  const taskCreationDateValue = new Date().toLocaleString();
  const taskPriorityValue = taskPriority.checked;
  const taskDeadlineValue = new Date(taskDeadline.value).toLocaleString();
  console.log({
    taskTextValue,
    taskCreationDateValue,
    taskPriorityValue,
    taskDeadlineValue,
  });
  const newBodyFetch = new TaskToDo(
    1,
    taskTextValue,
    taskPriorityValue,
    taskDeadlineValue,
    taskCreationDateValue
  );
  console.log(newBodyFetch);
  createTask(newBodyFetch);
  await sendDataToServer(newBodyFetch);
});

autoDownload();
