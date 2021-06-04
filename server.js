require('dotenv').config();
const app = require('./src/index');
const logger = require('./src/lib/logger');

const express = require('express')();

const port = process.env.PORT || 3000;

express
  .get('/', (req, res) => {
    res.json({ status: 'OK' });
  })
  .listen(port, () => logger.info(`App listening on port ${port}`));

app.launch();
