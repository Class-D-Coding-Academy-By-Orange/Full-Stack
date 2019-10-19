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
  DB.getdata(fromDB => {
    // console.log('CALL BACK FROM SERVER');
    res.json(fromDB);
  });
});

app.post('/addNewTask', (req, res) => {
  let box = req.body;
  // console.log('BOX:', box);
  DB.insert(insFromDB => {
    // console.log('CALL BACK FROM SERVER');
    res.json(insFromDB);
  }, box);
});

app.delete("/delete/:id", (req, res) => {
  // console.log(req.params);
  DB.remove1(result => {
    res.json(result);
  }, req.params.id);
  // console.log(req.params.id);
});

// 
app.put('/edit/:id', (req, res) => {
  // console.log(req.params.id);
  DB.edit(result => {
    res.json(result);
  }, req.params.id);
  // console.log(req.params.id);
});

const PORT = 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
