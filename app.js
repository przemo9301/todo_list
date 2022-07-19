const express = require("express");
const path = require("path");

const { PORT } = require("./data/todoData");
const { indexRouter } = require("./routes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT);
