const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./routes/user");
const api = require("./routes/api");
const verifyToken = require("./middleware/auth");
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/blog", verifyToken, api);
app.use("/", verifyToken, user);
app.use("/hello", verifyToken, (req, res, next) => {
  res.sendStatus(200);
});
app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
