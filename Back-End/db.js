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
  Tasks.find({},function(err, docs) {
    if (err) {
      console.log('ERR:', err);
      cb(err);
    }else{
      console.log('DOCS:', docs);
      cb(docs);
    }
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

let removeOne = (cb, _ID) => {
  // cb('DATABASE AFTER REMOVE');
  Tasks.findByIdAndRemove(_ID, (err,docs)=> {
    console.log('object_ID from DB :', _ID);
    if (err) {
      cb(err)
      console.log('ERR:', err);
    }else{ 
       getTasks(cb);
       console.log('DOCS:', docs);
    }
    
  });
};


let editTask = (_id,isCompleted,cb) => {
console.log('id from DB-----------------',_id),
console.log('isCompleted from DB-----------------', isCompleted)
isCompleted = (isCompleted == 'true');

  Tasks.findByIdAndUpdate(_id, {$set:{isCompleted: !isCompleted}},(err,docs)=>{
    if (err){
      cb(err)
    }else{
      getTasks(cb);
    }
  })
}


// Tasks.findByIdAndUpdate(togPrivate._id,
//   { $set: { private: !togPrivate.private } },
//   (err, data) => {
//     if (err) {
//       cb(err)
//     } else {
//       // console.log('new data:', data);
//       readRepos(cb)
//     }
//   })





module.exports = {
  abeer: getTasks,
  insert: insertTask,
  remove: removeOne,
  edit: editTask
};
