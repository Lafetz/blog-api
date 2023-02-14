const express = require("express");

require("dotenv").config();
const mongoose = require("mongoose");
const api = require("./routes/api");
const app = express();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/blog", api);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
