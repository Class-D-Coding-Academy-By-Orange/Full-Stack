const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo_list", {
  useNewUrlParser: true
});
const db = mongoose.connection;

db.on("error", function() {
  console.log("CONNECTION FAILED");
});
db.once("open", function() {
  console.log("CONNECTION SUCCESS");
});

const tasksSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean
});
const Tasks = mongoose.model("tasks", tasksSchema);

const getTasks = sendTasksFunction => {
  Tasks.find({}, (err, docs) => {
    if (err) {
      console.log("ERR:", err);
    } else {
      sendTasksFunction(docs);
    }
  });
};

const addTask = (sendTasksFunction, title) => {
  Tasks.create({ title, isCompleted: false }, err => {
    if (err) {
      console.log("ERR:", err);
    } else {
      getTasks(sendTasksFunction);
    }
  });
};

const removeTask = (sendTasksFunction, id) => {
  Tasks.deleteOne({ _id: id }, err => {
    if (err) {
      console.log("ERR:", err);
    } else {
      getTasks(sendTasksFunction);
    }
  });
};

const toggleTask = (sendTasksFunction, id) => {
  Tasks.findOne({ _id: id }, (err, doc) => {
    if (err) {
      console.log("ERR:", err);
    } else {
      Tasks.updateOne(
        { _id: id },
        { $set: { isCompleted: !doc.isCompleted } },
        err => {
          if (err) {
            console.log("ERR:", err);
          } else {
            getTasks(sendTasksFunction);
          }
        }
      );
    }
  });
};

const editTask = (sendTasksFunction, id, title) => {
  Tasks.updateOne({ _id: id }, { $set: { title } }, err => {
    if (err) {
      console.log("ERR:", err);
    } else {
      getTasks(sendTasksFunction);
    }
  });
};

module.exports = {
  getTasks,
  addTask,
  removeTask,
  toggleTask,
  editTask
};
