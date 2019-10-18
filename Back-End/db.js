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
  console.log('ID:', ID);

  Tasks.deleteOne({ _id: ID }, (err,data)=>{
    if(err){
      console.log('ERR:', err);
    }
    getTasks(cb);
  }
  )
  };



  let updateon = (cb, ID) => {
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
  abeer: getTasks,
  insert: insertTask,
  remove: removeOne,
  update:updateon
};
