const express = require("express");
const { readFile, writeFile } = require("fs").promises;
const schedule = require("node-schedule");
const indexRouter = express.Router();

const readFromFile = async () => {
  const newDataFromFile = await readFile("data/tasksData.txt", "utf8");
  return newDataFromFile;
};
const writeFromFile = async (data) => {
  await writeFile("data/tasksData.txt", JSON.stringify(data), "utf8");
  return "przeszło";
};

// (async () => {
//   const data = "2022-07-19T00:42";
//   const job = schedule.scheduleJob(data, async function () {
//     const data = await readFromFile();
//
//     console.log("The answer to life, the universe, and everything!");
//   });
//   console.log(job);
// })();

const redDeadline = async () => {
  const data = "2022-07-19T01:02";
  const job = schedule.scheduleJob(data, function () {
    console.log("The answer to life, the universe, and everything!sadadasdsa");
  });
  console.log(job);
};

indexRouter
  .post("/send/", async (req, res) => {
    await writeFromFile(req.body);
    await redDeadline();
    res.send({ answer: "ok" });
    console.log("działa od node");
  })
  .get("/send/", async (req, res) => {
    const jsonArrayToSend = await readFromFile();
    console.log("Działa readFromFile");
    res.json(jsonArrayToSend);
  });

module.exports = {
  indexRouter,
};
