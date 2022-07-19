const express = require("express");
const { readFile, writeFile } = require("fs").promises;
const indexRouter = express.Router();

const readFromFile = async () => await readFile("data/tasksData.txt", "utf8");

const writeFromFile = async (data) =>
  await writeFile("data/tasksData.txt", JSON.stringify(data), "utf8");

indexRouter
  .post("/send/", async (req, res) => {
    await writeFromFile(req.body);
    res.send({ answer: "OK", status: 200 });
  })
  .get("/send/", async (req, res) => {
    const jsonArrayToSend = await readFromFile();
    res.json(jsonArrayToSend);
  });

module.exports = {
  indexRouter,
};
