const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/toDoList", {
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
  title: String,
  isCompleted: Boolean
});
let Tasks = mongoose.model("tasks", tasksSchema);

let getTasks = cb => {
  // console.log("GET TASKS FROM DATABASE");
  Tasks.find({}, function(err, docs) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", docs);
    cb(docs);
  });
};

let insertTask = (cb, obj) => {
  // console.log("OBJ:", obj);
  // console.log("INSERT TASK TO DATABASE");
  Tasks.insertMany([{ title: obj.title, isCompleted: false }], function(
    err,
    NewTask
  ) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("NEWTASK:", NewTask);
    getTasks(cb);
  });
};

let removeOne = (cb, ID) => {
  Tasks.deleteOne({ _id: ID }, (err, docs) => {
    if (err) {
      console.log("DELETE ERR:", err);
    }
    console.log("DELETE TASK:", docs);
    getTasks(cb);
  });
};

let check = (cb, ID) => {
  // cb("DATABASE AFTER REMOVE");
  // console.log(ID);
  // console.log("CB :", cb);
  // console.log(ID);
  Tasks.findOne({ _id: ID }, function(err, docs) {
    if (err) {
      console.log("DELETE ERR:", err);
    } else {
      Tasks.updateOne(
        { _id: ID },
        { $set: { isCompleted: !docs.isCompleted } },
        function(err, docs) {
          if (err) {
            console.log("UPDATE ERR:", err);
          }
          console.log("UPDATE TASK:", docs);
          getTasks(cb);
        }
      );
    }
  });
};

module.exports = {
  getdata: getTasks,
  insert: insertTask,
  remove1: removeOne,
  edit: check
};
