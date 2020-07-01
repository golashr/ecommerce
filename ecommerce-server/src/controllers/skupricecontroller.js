'use strict';
const Checkout = require('../components/checkout');
const PricingRules = require('../components/pricingrules');
const logger = require('../logger/logger');
const { getSKUs, upsertSKUs } = require('../utils/utils');
const { checkoutSchema, updateSKUSchema } = require('../models/schema');
const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * Retrieve the total price at checkout token from the given service.
 * @param {items} items of the remote service
 * @return {total of the checkedout cart}
 */

exports.checkout = async (items) => {
  logger.info(`[+] Total number of items checkedout ${items.length}`);
  try {
    const result = ajv.validate(checkoutSchema, items);
    logger.info(`[+] Schema validation result is ${result}`);
    if(result) {
      const skus = await getSKUs();
      const pricingRules = new PricingRules(skus);
      const checkout = new Checkout(pricingRules);
      items.forEach((item) => {
        checkout.scan(item);
      });
      return checkout.total();
    } else {
      // Throw error to catch at the called method to send proper error response.
      throw Error("schema validation failed!");
    }
  }
  catch (err)
  {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
  }
};

/**
 * Retrieve the list of all SKUs from the given DB.
 * @param {url} URL of the remote service
 * @return {skus}
 */

exports.getSKUs = async () => {
  logger.info('[+] Retrieve list of SKUs');
  try {
    const skusDB = await getSKUs();
    let skus = [];
    skusDB.forEach(async (data) => {
      let sku = {}
      sku.sku = data.sku;
      sku.name = data.name;
      sku.price = data.price;
      sku.img = data.img;
      skus.push(sku);
    });
    return skus;
  }
  catch (err)
  {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
  }
};

/**
 * Insert/Update the SKU(s) from the given DB.
 * @param {url} URL of the remote service
 * @return {response data}
 */

exports.updateSKUs = async (items) => {
  logger.info('[+] Retrieve list of SKUs');
  try {
    const result = ajv.validate(updateSKUSchema, items);
    logger.info(`[+] Schema validation result is ${result}`);
    if(result) {
      await upsertSKUs(items);
    } else {
      // Throw error to catch at the called method to send proper error response.
      throw Error("schema validation failed!");
    }
  }
  catch (err)
  {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
  }
};