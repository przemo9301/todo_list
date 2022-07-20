const express = require("express");
const path = require("path");
const { indexRouter } = require("./routes");

const port = process.argv[2] || 3100;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(port);
