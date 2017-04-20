var app = require('./code/app');
var PORT = parseInt(3000);

app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
});