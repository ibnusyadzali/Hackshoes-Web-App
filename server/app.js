require("dotenv").config();
const router = require("./routers/index");
const express = require("express");
const errorHandling = require("./middleware/errorHandling");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandling);
app.listen(port, () => {
  console.log(`I dont need your ${port} love`);
});
