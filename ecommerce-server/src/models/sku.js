'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skuSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SKU', skuSchema);
