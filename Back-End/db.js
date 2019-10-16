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
  console.log("GET TASKS FROM DATABASE");
  Tasks.find({}, (err, docs) => {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", docs);
    cb(docs);
  });
};

let insertTask = (cb, obj) => {
  Tasks.insertMany(
    [{ title: obj.title, isCompleted: false }],
    (err, NewTask) => {
      if (err) {
        console.log("ERR : ", err);
      }
      console.log("NEWTASK : ", NewTask);
      getTasks(cb);
    }
  );
};

let removeOne = (cb, ID) => {
  Tasks.deleteOne({ _id: ID }, (err, docs) => {
    if (err) {
      console.log("ERR : ", err);
    }
    console.log("NEWTASK : ", docs);
    getTasks(cb);
  });
};

let update = (cb, ID) => {
  Tasks.findOne({ _id: ID }, (err, docs) => {
    if (err) {
      console.log("ERR : ", err);
    }
      Tasks.updateOne(
        { _id: ID },
        { $set: { isCompleted: !docs.isCompleted } },
        err => {
          if (err) {
            console.log("ERR : ", err);
          } else {
            getTasks(cb);
          }
        }
      );
  });
};

module.exports = {
  getTasks: getTasks,
  insert: insertTask,
  remove: removeOne,
  update: update
};
