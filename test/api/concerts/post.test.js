const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/concerts').send({ performer: 'Amanda Doe', genre: 'Soul', price: 50, day: 2, image: '6.png' });
    const newConcert = await Concert.findOne({ performer: 'Amanda Doe' });
    expect(res.status).to.be.equal(200);
    expect(newConcert).to.not.be.null;
  });

});