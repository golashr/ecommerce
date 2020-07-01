'use strict';
/**
 * Represents Checkout process and uses pricingRules.
 */

class Checkout {
  /**
   * Represents Checkout process.
   * @constructor
   * @param {list} pricingRules rules to be used
   */
  constructor(pricingRules) {
    this.checkoutItems = [];
    this.pricingRules = pricingRules;
  }
  /**
   * Item of which price to be added in the list
   * @param {item} item of scanned items
   * @return {number} price
   */


  scan(item) {
    this.checkoutItems.push(item);
    return;
  }
  /**
   * Total of which price to be added in the list
   * @return {number} price
   */


  total() {
    if (this.pricingRules) {
      return this.pricingRules.calculateTotal(this.checkoutItems);
    } else {
      return -1;
    }
  }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Checkout;
} else {
  window.Checkout = Checkout;
}
//# sourceMappingURL=checkout.js.map