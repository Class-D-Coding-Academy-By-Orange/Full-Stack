const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/toDoList16-10', {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', function() {
  console.log('mongoose connection error');
  console.log('____________________________');
});
db.once('open', function() {
  console.log('mongoose connected successfully');
  console.log('____________________________');
});
let tasksSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean
});
let Tasks = mongoose.model('tasks', tasksSchema);
let getTasks = cb => {
  console.log('GET TASKS FROM DATABASE');
  Tasks.find({}, function(err, docs) {
    if (err) {
      console.log('ERR:', err);
    }
    console.log('DOCS:', docs);
    cb(docs);
  });
};

let insertTask = (cb, obj) => {
  console.log('OBJ:', obj);
  console.log('INSERT TASK TO DATABASE');
  Tasks.insertMany([{ title: obj.title, isCompleted: false }], function(
    err,
    NewTask
  ) {
    if (err) {
      console.log('ERR:', err);
    }
    console.log('NEWTASK:', NewTask);
    getTasks(cb);
  });
};

let removeOne = (cb, ID) => {
  console.log(ID);
  Tasks.findByIdAndRemove(ID,(err,removeTask)=>{
    if(err){
      console.log("err", err);
    }
    console.log("removeTask" , removeTask);
    getTasks(cb);
  })
};
let editOne = (cb,ID) =>{
  console.log("Edit DB");
  console.log(ID);
  // var a;
  // Tasks.findByIdAndUpdate(ID,(err,editedTask)=>{
    let isComplete = Tasks.findById(ID,(a,b)=>
    {
      let status = !b.isCompleted;
      // console.log(status);

        
    Tasks.updateOne({_id:ID},{isCompleted : status  },(err,editedTask)=>{
    if(err){
      console.log(err);
    }
    console.log(editedTask);
   
    getTasks(cb)
  })
    });

    // console.log(isComplete);
    // console.log(a);

}
module.exports = {
  abeer: getTasks,
  insert: insertTask,
  remove: removeOne,
  edit : editOne
};
