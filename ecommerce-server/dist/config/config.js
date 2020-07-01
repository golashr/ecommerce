"use strict";

module.exports = {
  server: {
    port: process.env.PORT || 3999,
    env: process.env.NODE_ENV // eslint-disable-next-line no-inline-comments

  },
  mongodb: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    dbName: process.env.MONGO_DB || 'ecommercesku'
  }
};
//# sourceMappingURL=config.js.map