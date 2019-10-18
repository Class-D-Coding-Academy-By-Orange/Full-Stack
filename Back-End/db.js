//========================================Connection===========================================//
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/toDoList16-10", {
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

//========================================Schema===============================================//
let tasksSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean
});

let Tasks = mongoose.model("tasks", tasksSchema);
//=========================================GET=================================================//

const get = cb => {
  Tasks.find({}, function(err, docs) {
    if (err) {
      console.log("ERR:", err);
    }
    cb(docs);
  });
};
//=========================================ADD=================================================//

const add = (cb, obj) => {
  Tasks.insertMany([{ title: obj.title, isCompleted: false }], function(
    err,
    NewTask
  ) {
    if (err) {
      console.log("ERR:", err);
    }
    get(cb);
  });
};
//=========================================DEL=================================================//

const del = (cb, ID) => {
  Tasks.findByIdAndRemove(ID, (err, removeTask) => {
    if (err) {
      console.log("err", err);
    }
    get(cb);
  });
};
//=========================================EDIT=================================================//

const edit = (cb, ID) => {
   Tasks.findById(ID, (a, b) => {
    let status = !b.isCompleted;
    Tasks.updateOne({ _id: ID }, { isCompleted: status }, (err, editedTask) => {
      if (err) {
        console.log(err);
      }
      get(cb);
    });
  });
};
//=====================================MODULE EXPORTS=============================================//

module.exports = {
  get,
  add,
  del,
  edit
};
