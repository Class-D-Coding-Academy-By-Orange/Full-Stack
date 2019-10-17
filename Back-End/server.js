//======================================REQUIRE===================================================//

const express = require('express');
const cors = require('cors');
const DB = require('./db');
const app = express();
//========================================USE=====================================================//

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

//=========================================GET====================================================//

app.get('/data', (req, res) => {
  DB.get(result => {
    res.json(result);
  });
});
//=========================================ADD====================================================//

app.post('/addNewTask', (req, res) => {
  let box = req.body;
  DB.add(result => {
    res.json(result);
  }, box);
});
//========================================DELETE==================================================//

app.delete('/delete/:id', (req, res) => {
  DB.del(result => {
    res.json(result);
  }, req.params.id);
});
//=========================================EDIT===================================================//

app.get('/edit/:id', (req,res)=>{
  DB.edit(result=>{
    res.json(result)
  },req.params.id)
});
//========================================LISTEN==================================================//

const PORT = 9000;
app.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
