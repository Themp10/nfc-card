const express = require('express');
const mysql = require('mysql');
const app = express();
const middleware=require("./middleware")
const port = 5000;
const cors = require('cors');
const crypto = require('crypto');
const routes = require('./routes');
const path = require('path');
function generateId(id) {
  const car="0123456789abcdefghijk"
  let randomNumber = 0
  let newstr=""
  for (let i = 0; i < 10; i++) {
    let currentChar = car[Math.floor(Math.random() * car.length)];
    newstr+=currentChar
  }
  return newstr+"-"+id;
}

app.use(middleware.corsMiddleware());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// middleware that returns the file 
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

//req Format Validator
app.use(middleware.reqFormatMiddleware);
//=============ROUTES===============================



routes(app);

app.get('/:id', (req, res) => {
  console.log(req.params)
const hashValue = generateId(req.params.id);
  res.send(`
    <html>
      <head>
        <title>User Data</title>
      </head>
      <body>
        <h1>${hashValue}</h1>
      </body>
    </html>
  `);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});