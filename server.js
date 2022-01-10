/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const path = require('path');
const url = require('url');

const { fileURLToPath } = url;

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8081);

app.listen(app.get('port'));
