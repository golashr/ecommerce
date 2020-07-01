'use strict';
const logger = require('../logger/logger');

/**
 * Represents Pricing Rules applicable for calculating total price
 */
class PricingRules {
  /**
   * Represents PricingRules.
   * @constructor
   * @param {list} skus list of skus from MongoDB
   */
  constructor(skus) {
    if (!skus) {
      logger.error('[+] getSKUs -- error getting skus from mongoDB!');
    }
    skus.forEach((data) => {
      logger.info(`[+] ECommerce service has ${data.sku}, ${data.name}, ${data.price}, ${data.img}.`);
    });
    this.products = skus;
    logger.info(`[+] Total number of products in pricingRules ${this.products.length}`);
  }

  /**
   * Item of which price to be calculated
   * @param {list} items of scanned items
   * @return {number} price
   */
  calculateTotal(items) {
    logger.info(`[+] Total number of checkedout items in pricingRules ${items.length}`);

    // 1. We're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
    // 2. The brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
    // 3. We will bundle in a free VGA adapter free of charge with every MacBook Pro sold
    let calculateTotal = 0;
    let vgaNumber = 0,
      mbpNumber = 0;
    items.forEach((item) => {
      if (item.sku === 'vga') {
        vgaNumber = item.number;
      } else if (item.sku === 'mbp') {
        mbpNumber = item.number;
      }
    });
    if (mbpNumber > 0) {
      vgaNumber -= mbpNumber;
      if (vgaNumber < 0) {
        vgaNumber = 0;
      }
    }
    items.forEach((item) => {
      if (item.sku === 'atv') {
        let itemToPrice = item.number;
        if (item.number >= 3) {
          itemToPrice -= 1;
        }
        calculateTotal += this.getPriceOfSKU(item.sku) * itemToPrice;
      } else if (item.sku === 'ipd') {
        let itemPrice = this.getPriceOfSKU(item.sku);
        if (item.number > 4) {
          itemPrice = 499.99;
        }
        calculateTotal += itemPrice * item.number;
      } else if (item.sku === 'mbp') {
        let itemPrice = this.getPriceOfSKU(item.sku);
        calculateTotal += itemPrice * item.number;
      } else if (item.sku === 'vga') {
        let itemPrice = this.getPriceOfSKU(item.sku);
        calculateTotal += itemPrice * vgaNumber;
      }
    });
    return calculateTotal;
  }

  /**
   * Item of which price to be calculated
   * @param {item} sku item
   * @return {number} price
   */
  getPriceOfSKU(sku) {
    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      if (product.sku === sku) {
        return product.price;
      }
    }
    return -1;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = PricingRules;
} else {
  window.PricingRules = PricingRules;
}
