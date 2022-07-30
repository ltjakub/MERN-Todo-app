const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const todo = require("./routes/todo");
require("dotenv").config();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
app.use(express.json());
app.use(cors({ origin: "*" }));
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connected to database.");
});
app.use("/todo", todo);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
