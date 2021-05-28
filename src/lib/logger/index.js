const pino = require('pino')({
  enabled: process.env.LOG_ENABLE,
  level: process.env.LOG_LEVEL,
});

module.exports = pino;
