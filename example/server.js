const express  = require('express');
const germaine = require('../index');
const path     = require('path');


const app = express();

app.get('/germaine/*', germaine(path.resolve(__dirname, './example-database.json')));

app.listen(3030, function () {
  console.log('Example app listening on port 3000!');
});
