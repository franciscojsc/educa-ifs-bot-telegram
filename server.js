require('dotenv').config();
const app = require('./src/index');
const logger = require('./src/lib/logger');

if (process.env.NODE_ENV == 'production') {
  const express = require('express')();

  const port = process.env.PORT || 3000;
  const url = process.env.URL;
  const token = process.env.TOKEN;

  app.telegram.setWebhook(`${url}/bot${token}`);
  express.use(app.webhookCallback(`/bot${token}`));

  express
    .get('/', (req, res) => {
      res.json({ status: 'OK' });
    })
    .listen(port, () => logger.info(`App listening on port ${port}`));
} else {
  app.launch();
}
