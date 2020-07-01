'use strict';
const mongoose = require('mongoose');
const logger = require('../logger/logger');

/**
 * Connect with the MongoDB with given DB_URI
 * @param {DB_URI}
 */

exports.connect = (DB_URI) => {
  return new Promise((resolve) => {
    mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        logger.error(`[+] Failed to connect to MongoDB ${DB_URI} with error ${err}`);
        process.exit();
      });
  });
};

/** Close the MongoDB connection.
 * @return {promise}
 */

exports.close = async () => {
  return await mongoose.connection.close(false);
};

/** dropDatabase the MongoDB connection.
 * @return {promise}
 */

exports.dropDatabase = async () => {
  return await mongoose.connection.db.dropDatabase();
};
