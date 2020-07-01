'use strict';

require("core-js/modules/es.promise");

const express = require('express');

const logger = require('../logger/logger');

const {
  successResponse,
  errorResponse
} = require('../utils/utils');

const skuPriceController = require('../controllers/skupricecontroller'); // eslint-disable-next-line new-cap


const router = express.Router();
/**
 * Router POST call with '/checkout' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.post('/checkout', async (request, response) => {
  logger.info('[+] In the checkout');

  try {
    let totalprice = await skuPriceController.checkout(request.body);
    logger.info('[+] Total price calculated successfully.');
    return successResponse(response, '<h1>The price is calculated by ECommerce service.</h1>', totalprice);
  } catch (err) {
    logger.info('[+] Exception thrown in calculating total price.');
    return errorResponse(response, "<h1>The schema validation error thrown ".concat(err.message, "</h1>"), 400);
  }
});
/**
 * Router GET call with '/getSKUs' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/getSKUs', async (request, response) => {
  logger.info('[+] In the getSKUs');

  try {
    let getSKUs = await skuPriceController.getSKUs();
    return successResponse(response, '<h1>The list of SKUs are retrieved by ECommerce service.</h1>', getSKUs);
  } catch (err) {
    logger.info('[+] Exception thrown in get SKUs');
    return errorResponse(response, "<h1>The retrieve SKUs API threw exception ".concat(err.message, "</h1>"), 500);
  }
});
/**
 * Router POST call with '/updateSKUs' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.post('/updateSKUs', async (request, response) => {
  logger.info('[+] In the updateSKUs');

  try {
    await skuPriceController.updateSKUs(request.body);
    return successResponse(response, '<h1>The given SKU(s) updated by ECommerce service in its DB.</h1>', 'OK');
  } catch (err) {
    logger.info('[+] Exception thrown in updating SKUs');
    return errorResponse(response, "<h1>The schema validation error thrown ".concat(err.message, "</h1>"), 400);
  }
});
module.exports = router;
//# sourceMappingURL=api.js.map