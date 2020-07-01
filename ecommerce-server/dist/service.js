'use strict';

require("core-js/modules/es.promise");

const http = require('http');

const dotenv = require('dotenv');

const path = require('path');

const logger = require('./logger/logger');

const db = require('./components/db');

const utils = require('./utils/utils');

const server = require('./index');

logger.info("[+] Loading Environment Variables from '../environments/".concat(process.env.NODE_ENV, "/.env'"));
dotenv.config({
  path: path.resolve(process.cwd(), "./environments/".concat(process.env.NODE_ENV, "/.env"))
});

const config = require('./config/config');

const DB_URI = "mongodb://".concat(config.mongodb.host, ":").concat(config.mongodb.port, "/").concat(config.mongodb.dbName);
db.connect(DB_URI).then(async () => {
  logger.info("[+] Connected to MongoD at ".concat(DB_URI));
  await utils.initSKU();
});
const httpServer = http.createServer(server);
httpServer.listen(process.env.PORT, () => {
  logger.info("[+] ECommerce server running on port ".concat(process.env.PORT));
});

const shutDown = async () => {
  logger.info('[+] SIGTERM signal received.');
  logger.info('[+] Closing http server.');
  await httpServer.close();
  logger.info('[+] Http server closed.');
  await db.close();
  logger.info('[+] MongoDB closed');
  process.exit(0);
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
module.exports.port = process.env.PORT;
module.exports.env = process.env.NODE_ENV;
module.exports.DB_URI = process.env.DB_URI;
//# sourceMappingURL=service.js.map