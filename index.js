const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.set('port', process.env.PORT || 8081);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
app.listen(app.get('port'));
