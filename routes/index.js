const express = require("express");
const indexRouter = express.Router();

indexRouter.post("/send/", (req, res) => {
  console.log(req.body);
  console.log("działa od node");
  res.send({ answer: "ok backend" });
});

module.exports = {
  indexRouter,
};
