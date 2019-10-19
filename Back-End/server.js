const express = require('express');
const cors = require('cors');
const DB = require('./db');
const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());

app.get('/data', (req, res) => {
  DB.abeer(baba => {console.log('CALL BACK FROM SERVER');
  res.json(baba); });
});

app.post('/addNewTask', (req, res) => {
  let box = req.body;
  console.log('BOX:', box);
  DB.insert(baba => {
    console.log('CALL BACK FROM SERVER');
    res.json(baba);
  }, box);
});

app.delete('/delete/:_id', (req, res) => {
  // console.log('---------------------', req.params._id)
  DB.remove(result => {
    res.json(result);
  },req.params._id);
  // console.log('id: ',req.params._id);
});

app.put('/edit/:_id/:isCompleted',(req,res) => {
  let id = req.params._id
  let isCompleted= req.params.isCompleted
    // console.log('EDIT: ', req.params._id)
console.log('req.params.isCompleted from server', req.params.isCompleted);

  DB.edit(id,isCompleted, (result) => {
    res.json(result)
  })
})

const PORT = 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
