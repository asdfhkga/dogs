var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'scripts')));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/home.html')
});

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/html/main.html')
});

app.get('/online', (req, res) => {
  res.sendFile(__dirname + '/html/online.html')
});

app.get('/bot', (req, res) => {
  res.sendFile(__dirname + '/html/bot.html')
});

app.listen(3000);
console.log('Listening on port 3000');