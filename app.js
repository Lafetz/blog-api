const express = require("express");
const api = require("./routes/api");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/blog", api);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
