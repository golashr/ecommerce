import Ajv from 'ajv';
import { get, post } from './restapi';
import { getSKUsSchema, checkoutSchema } from './schema';

const baseURL = `http://${window.location.hostname}:3001/api/v1`;
const ajv = new Ajv();

class ECommerce {
  constructor() {
    this.skus = [];
  }

  async getSKUs() {
    if (this.skus.length <= 0) {
      const entity = `${baseURL}/getSKUs`;
      console.log(entity);
      const response = await get({ url: entity });
      if (response && response.response && response.response.data && response.response.data.data) {
        console.log('SKUs received from the ecommerce server ', response.response.data.data);
        const valid = ajv.validate(getSKUsSchema, response.response.data);
        if (valid) {
          console.log('Schema is validated!');
          this.skus = response.response.data.data;
        } else {
          console.log('Schema is INVALID!');
          console.log(ajv.errors);
          this.skus = null;
        }
      }
    }
    return this.skus;
  }

  getCost = async (listOfItems) => {
    const entity = `${baseURL}/checkout`;
    console.log(entity);
    const response = await post({ url: entity, data: listOfItems });
    console.log('Cost json received from the ecommerce server ', response.response.data.data);
    const valid = ajv.validate(checkoutSchema, response.response.data);
    if (valid) {
      console.log('Schema is validated!');
      return response.response.data.data;
    } else {
      console.log('Schema is INVALID!');
      console.log(ajv.errors);
      return 0;
    }
  };
}
export default ECommerce;
