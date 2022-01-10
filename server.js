/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8081);

app.listen(app.get('port'));
