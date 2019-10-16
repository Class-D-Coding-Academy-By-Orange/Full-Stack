const express = require('express');
const cors = require('cors');
const DB = require('./db');
const app = express();
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//----------------------------------------GET DATA

app.get('/data', (req, res) => {
  DB.abeer(baba => {
    console.log('CALL BACK FROM SERVER');
    res.json(baba);
  });
});

//-------------------------------------addNewTask

app.post('/addNewTask', (req, res) => {
  let box = req.body;
  console.log('BOX:', box);
  DB.insert( baba => {
    console.log('CALL BACK FROM SERVER');
    res.json(baba);
  }, box);
});


//------------------------------------DELETE

app.delete('/delete/:ID', (req, res) => {
  console.log('object :', req.params.ID);
  DB.remove(result => {

    res.json(result);
  }, req.params.ID);
  // console.log('req.params.ID :', req.params.ID);

});

app.get('/edit/:ID', (req,res)=>{
  console.log("edit Server");
  DB.edit(result=>{
    res.json(result)
  },req.params.ID)
});

const PORT = 9002;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
