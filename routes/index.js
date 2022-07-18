const express = require("express");
const { readFile, writeFile } = require("fs").promises;
const indexRouter = express.Router();

const readFromFile = async () => {
  const newDataFromFile = await readFile("data/tasksData.txt", "utf8");
  return newDataFromFile;
};
const writeFromFile = async (data) => {
  await writeFile("data/tasksData.txt", JSON.stringify(data), "utf8");
  return true;
};

indexRouter
  .post("/send/", (req, res) => {
    const dataWritten = writeFromFile(req.body);
    console.log(dataWritten);
    console.log(req.body);
    console.log("działa od node");
  })
  .get("/get/", async (req, res) => {
    const jsonArrayToSend = await readFromFile();
    console.log("Działa readFromFile");
    res.json(jsonArrayToSend);
  });

module.exports = {
  indexRouter,
};
