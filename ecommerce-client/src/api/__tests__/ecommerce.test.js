/* eslint-env jest */
/* eslint-disable import/first */

import ECommerce from '../ecommerce';

describe('#getSKUs() using Promises', () => {
  beforeAll(() => {
    jest.spyOn(ECommerce.prototype, 'getSKUs').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          data: [
            {
              sku: 'mbp',
              name: 'MacBook Pro',
              price: '1399.99',
              img: './images/image2.jpg',
            },
            {
              sku: 'atv',
              name: 'Apple TV',
              price: '109.5',
              img: './images/image3.jpg',
            },
            {
              sku: 'vga',
              name: 'VGA adapter',
              price: '30',
              img: './images/image4.jpg',
            },
            {
              sku: 'ipd',
              name: 'Super iPad',
              price: '549.99',
              img: './images/image1.jpg',
            },
          ],
        });
      });
    });
  });

  it('should load user data', async () => {
    const ecommerce = new ECommerce();
    const store = await ecommerce.getSKUs();
    expect(store).toBeDefined();
  });
});
