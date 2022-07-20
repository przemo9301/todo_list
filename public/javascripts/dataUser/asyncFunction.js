const sendDataToServer = async (sendInfoByBody) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(sendInfoByBody),
    };
    const sendData = await fetch(
      "http://vps-3bd63737.vps.ovh.net/send/",
      options
    );
    const data = await sendData.json();
    console.log(data);
  } catch (e) {
    console.log("Fetch (sendDataToServer) post is not working ", e);
  }
};
const getDataFromServer = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    };
    const sendData = await fetch(
      "http://vps-3bd63737.vps.ovh.net/send/",
      options
    );
    const data = await sendData.json();
    return data;
  } catch (e) {
    console.log("Fetch (getDataFromServer) get is not working ", e);
  }
};
let timeout = [];

const deadlineRed = async () => {
  const arr = createTaskList.showListFromArray();
  for (let i = 0; i < timeout.length; i++) {
    clearTimeout(timeout[i]);
  }
  timeout.length = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].taskDeadlineClass !== "") {
      const timeDifference =
        new Date(arr[i].taskDeadlineClass).getTime() - new Date().getTime();
      if (0 >= timeDifference && !arr[i].taskMeetDeadline) {
        arr[i].taskMeetDeadline = !arr[i].taskMeetDeadline;
        createNewTasksList();
      } else if (0 <= timeDifference) {
        timeout.push(
          setTimeout(() => {
            arr[i].taskMeetDeadline = !arr[i].taskMeetDeadline;
            createNewTasksList();
          }, timeDifference)
        );
      }
    }
  }
  await sendDataToServer(createTaskList.showListFromArray());
};
