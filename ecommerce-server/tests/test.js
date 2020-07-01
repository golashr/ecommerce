const { expect } = require('chai');
const request = require('supertest');
const server = require('../src/service');
const app = require('../src/index');
const config = require('../src/config/config');
const utils = require('../src/utils/utils');
const db = require('../src/components/db');

describe('Init Testing', function() {
  describe('Test environment variables validation', () => {
    it('tests that server is running on test mode', async () => {
      expect(server.env).to.equal(config.server.env);
    });

    it('tests that server is running current port', async () => {
      expect(server.port).to.equal(config.server.port);
    });
  });

  describe('Test routes availability here', () => {
    it('tests should show server is running', async () => {
      const res = await request(app).get('/');
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });
    it('tests should show server is pinging', async () => {
      const res = await request(app).get('/ping');
      expect(res.status).to.equal(200);
      expect(res.body.message).to.have.string('Pong');
    });
  });

  describe('Test get SKUs from the server', () => {
    before(async () => {
      console.log('initililising DB with initial data!');
      await utils.initSKU();
    });

    it('check number of SKUs', async () => {
      let res = await request(app)
        .get('/api/v1/getSKUs');
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data.length).to.equal(4);
    });

    after(async () => {
      console.log('cleaning up the DB!');
      await utils.cleanUpSKUs();
    });
  });

  describe('Test cart total price', () => {
    before(async () => {
      console.log('initililising DB with initial data!');
      await utils.initSKU();
    });

    it('totalprice when SKUs Scanned: atv, atv, atv, vga Total expected', async () => {
      const res = await request(app)
        .post('/api/v1/checkout')
        .send([
            {
              sku: 'atv',
              number: 3,
            },
            {
              sku: 'vga',
              number: 1,
            },
          ]);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.equal(249);
    });

    it('totalprice when SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected', async () => {
      const res = await request(app)
        .post('/api/v1/checkout')
        .send([
            {
              sku: 'atv',
              number: 2,
            },
            {
              sku: 'ipd',
              number: 5,
            },
          ]);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.equal(2718.95);
    });

    it('totalprice when SKUs Scanned: mbp, vga, ipd Total expected', async () => {
      const res = await request(app)
        .post('/api/v1/checkout')
        .send([
            {
              sku: 'mbp',
              number: 1,
            },
            {
              sku: 'vga',
              number: 1,
            },
            {
              sku: 'ipd',
              number: 1,
            },
          ]);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.equal(1949.98);
    });

    after(async () => {
      console.log('cleaning up the DB!');
      await utils.cleanUpSKUs();
    });
  });

  describe('Test update price of SKUs', () => {
    before(async () => {
      console.log('initililising DB with initial data!');
      await utils.initSKU();
    });

    function delay(interval) {
      return it('should delay', done => {
        setTimeout(() => done(), interval)
      }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
    }

    it('update price of atv and mbp', async () => {
      let res = await request(app)
        .post('/api/v1/updateSKUs')
        .send([
            {
              sku: 'atv',
              price: 999.99,
            },
            {
              sku: 'mbp',
              price: 9999.99,
            },
          ]);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.have.string('updated');
    });
    
    //Waiting for update of DB to get completed. Pessimistic concurrency
    delay(1000);

    it('and check the total of one atv and 2 mbp', async () => {
      let res = await request(app)
        .post('/api/v1/checkout')
        .send([
            {
              sku: 'atv',
              number: 1,
            },
            {
              sku: 'mbp',
              number: 2,
            },
          ]);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.equal(20999.97);
    });

    after(async () => {
      console.log('cleaning up the DB!');
      await utils.cleanUpSKUs();
    });
  });

  after(async () => { 
    console.log('dropping DB and cleaning up!');
    await db.dropDatabase();
  });
});