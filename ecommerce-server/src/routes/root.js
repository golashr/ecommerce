'use strict';
const express = require('express');
const logger = require('../logger/logger');
var { successResponse } = require('../utils/utils');

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * Router GET call with '/' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/', (request, response) => {
  logger.info('[+] In the root');
  return successResponse(response, '<h1>Hello from ECommerce Service!</h1>','OK');
});

/**
 * Router GET call with '/ping' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/ping', (request, response) => {
  logger.info('[+] In the ping');
  return successResponse(response, '<h1>Pong from ECommerce server!</h1>','OK');
});

module.exports = router;
