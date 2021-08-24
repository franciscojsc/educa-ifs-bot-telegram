const mongoose = require('mongoose');
const logger = require('./../lib/logger');

const MONGODB_URL = process.env.MONGODB_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
};

const connectDB = async (mongoose, url, options) => {
  await mongoose.connect(url, options);
};

mongoose.Promise = global.Promise;

const { connection } = mongoose;

connection.on('connected', () => {
  logger.info(`Mongoose connection open`);
});

connection.on('error', (error) => {
  logger.error(`Mongoose connection error: ${error}`);
});

connection.on('exception', (error) => {
  logger.error(`Mongoose connection exception: ${error}`);
});

connection.on('disconnected', async () => {
  logger.info(`Mongoose connection disconnected`);
});

connection.on('reconnected', () => {
  logger.info(`Mongoose connection reconnected`);
});

connection.on('open', () => {
  logger.info(`Mongoose connection is open`);
});

process.on('SIGINT', () => {
  connection.close(() => {
    logger.info(
      `Mongoose default connection disconnected through app termination`
    );
    process.exit(0);
  });
});

connectDB(mongoose, MONGODB_URL, options);

module.exports = mongoose;
