const express = require("express");
const fs = require("fs");
const { promisfy } = require("promisfy");
const indexRouter = express.Router();

const readFile = promisfy(fs.readFile);
const writeFile = promisfy(fs.writeFile);

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
