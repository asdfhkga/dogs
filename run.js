var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'scripts')));


app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html')
});

app.listen(3000);
console.log('Listening on port 3000');