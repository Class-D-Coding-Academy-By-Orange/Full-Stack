const express = require("express");
const cors = require("cors");
const DB = require("./db");
const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.get("/data", (req, res) => {
  DB.getData(data => {
    console.log("CALL BACK FROM SERVER");
    res.json(data);
  });
});

app.post("/addNewTask", (req, res) => {
  DB.insert(tasks => {
    res.json(tasks);
  }, req.body);
});

app.get("/delete/:id", (req, res) => {
  DB.remove(result => {
    res.json(result);
  }, parseInt(req.params.id));
});

app.get("/", (req, res) => {
  res.json("I am The Root Page");
});

const PORT = 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
