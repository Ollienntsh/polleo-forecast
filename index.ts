import bodyParser = require('body-parser');
import dotenv = require('dotenv');
import errorhandler = require('errorhandler');
import express = require('express');
import morgan = require('morgan');
import notifier = require('node-notifier');
import path = require('path');

dotenv.config();

const app = express();
const ipAddress = process.env.IP_ADDRESS || '127.0.0.1';
const port = Number(process.env.PORT || '8083');

const errorNotification = (_err: Error, str: string, req: express.Request) => {
  const title = `Error in ${req.method} ${req.url}`;

  notifier.notify({
    title: title,
    message: str,
  });
};

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(morgan('combined'));
app.use(errorhandler({ log: errorNotification }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(port, ipAddress);
