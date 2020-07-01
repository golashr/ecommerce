'use strict';
const util = require('util');
const logger = require('../logger/logger');
const initialData = require('../models/initialdata');
const SKU = require('../models/sku');

/**
 * Enriched Success response for the client
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {data} response object for the client app
 * @return {response object}
 */

const successResponse = (response, message = null, data = null) => {
  response.status(200).send({
    success: true,
    timestamp: Date.now(),
    message,
    data,
  });
};

/**
 * Enriched error response for the client
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {status} 403 status for the client app
 * @return {response object}
 */

const errorResponse = (response, message, status = 403, data = null) => {
  response.status(status).send({
    success: false,
    timestamp: Date.now(),
    message,
    data
  });
};

/**
 * FORMAT OF TOKEN x-access-token
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {status} 403 status for the client app
 * @return {response object}
 */

const verifyAccessToken = (request, response, next) => {
  // Get auth header value
  // eslint-disable-next-line space-infix-ops
  const serverHeader = request.headers['x-access-token'];

  // Check if server is undefined
  if (typeof serverHeader !== 'undefined') {
    if (serverHeader === 'sjd1HfkjU83ksdsm3802k') {
      // Next middleware
      // eslint-disable-next-line callback-return
      next();
    }
  } else {
    errorResponse(response, 'Forbidden');
  }
};

/**
 Insert SKU with initial data
 */

const initSKU = async () => {
  const number = await SKU.countDocuments();
  if (number <= 0) {
    await addSKUs();
  }
};

/**
 * Retrieve all skus from the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

const getSKUs = async () => {
  logger.info('[+] SKUs to look from ECommerce Service');
  SKU.find = util.promisify(SKU.find);
  let skus = await SKU.find({});
  return skus;
};

/**
 * Delete all skus from the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

const cleanUpSKUs = async () => {
  logger.info('[+] Delete SKUs from ECommerce Service');
  await SKU.deleteMany();
};

/**
 * Add new skus from initial data to the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

const addSKUs = async () => {
  initialData.forEach(async (data) => {
    logger.info(`[+] ECommerce service added. ${data.sku}, ${data.name}, ${data.price}, ${data.img}`);
    var sku = new SKU();
    sku.sku = data.sku;
    sku.name = data.name;
    sku.price = data.price;
    sku.img = data.img;
    try {
      await sku.save();
    } catch (err) {
      logger.error(`[+] addSKU -- error adding sku ${err}`);
    }
  });
};

/**
 * Add new skus from initial data to the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

const upsertSKUs = async (items) => {
  items.forEach(async (data) => {
    logger.info(`[+] ECommerce service to be updated/inserted. ${data.sku}, ${data.price}`);
    const filter = { sku: data.sku };
    const update = { price: data.price };
    try {
      let doc = await SKU.findOne(filter);
      let oldPrice = doc.price;
      doc = await SKU.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
      });
      doc = await SKU.findOne(filter);
      logger.info(`[+] ${data.sku} old price was ${oldPrice} and now, new price is ${doc.price} `);
    } catch (err) {
      logger.error(`[+] addSKU -- error adding sku ${err}`);
    }
  });
};

exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
exports.verifyAccessToken = verifyAccessToken;
exports.initSKU = initSKU;
exports.cleanUpSKUs = cleanUpSKUs;
exports.getSKUs = getSKUs;
exports.addSKUs = addSKUs;
exports.upsertSKUs = upsertSKUs;
