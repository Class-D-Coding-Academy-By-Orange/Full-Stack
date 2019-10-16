const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/toDoList16-10-19", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", function() {
  console.log("mongoose connection error");
  console.log("____________________________");
});
db.once("open", function() {
  console.log("mongoose connected successfully");
  console.log("____________________________");
});
let tasksSchema = new mongoose.Schema({
  id:Number,
  title: String,
  isCompleted: Boolean
});
let Tasks = mongoose.model("todos", tasksSchema);
let getTasks = cb => {
  console.log("GET TASKS FROM DATABASE");
  Tasks.find({}, function(err, docs) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", docs);
    cb(docs);
  });
};

let insertTask = (cb, obj) => {
  Tasks.insertMany([{ id: obj.id, title: obj.title, isCompleted: false }], function(
    err,
    NewTask
  ) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("NEW TASK:", NewTask);
    getTasks(cb);
  });
};

let removeOne = (cb, id) => {
  Tasks.deleteOne({ id: id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      getTasks(cb);
    }
  });
  console.log(id);
};
module.exports = {
  getData: getTasks,
  insert: insertTask,
  remove: removeOne
};
