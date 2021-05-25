const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () =>
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

mongoose.Promise = global.Promise;

const { connection } = mongoose;

connection.on('connected', () => {
  console.log(`Mongoose connection open`);
});

connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error}`);
});

connection.on('exception', (error) => {
  console.log(`Mongoose connection exception: ${error}`);
});

connection.on('disconnected', async () => {
  console.log(`Mongoose connection disconnected`);
  console.log(`Try connection in MongoDB database...`);
  await mongoose.disconnect();
  setTimeout(() => connectDB(), 3000);
});

connection.on('reconnected', () => {
  console.log(`Mongoose connection reconnected`);
});

connection.on('open', () => {
  console.log(`Mongoose connection is open`);
});

process.on('SIGINT', () => {
  connection.close(() => {
    console.log(
      `Mongoose default connection disconnected through app termination`
    );
    process.exit(0);
  });
});

connectDB();

module.exports = mongoose;
