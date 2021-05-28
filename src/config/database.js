const mongoose = require('mongoose');
const logger = require('./../lib/logger');

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () =>
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
  logger.info(`Try connection in MongoDB database...`);
  await mongoose.disconnect();
  setTimeout(() => connectDB(), 3000);
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

connectDB();

module.exports = mongoose;
