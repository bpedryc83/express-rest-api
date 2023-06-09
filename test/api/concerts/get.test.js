const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '1.jpg' });
    await testConOne.save();
  
    const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Amanda Doe', genre: 'Soul', price: 50, day: 2, image: '6.png' });
    await testConTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/random should return one random concert', async () => {
    const res = await request(server).get('/api/concerts/random');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/concerts/performer/:performer should return all concerts for the specified performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John%20Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
    expect(res.body[0]).to.be.an('object');
    expect(res.body[0]).to.not.be.null;
    expect(res.body[0].performer).to.be.equal('John Doe');
  });

  it('/concerts/genre/:genre should return all concerts for the specified genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Soul');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
    expect(res.body[0]).to.be.an('object');
    expect(res.body[0].performer).to.be.equal('Amanda Doe');
  });

  it('/concerts/price/:price_min/:price_max should return all concerts with the specified range of the price ', async () => {
    const res1 = await request(server).get('/api/concerts/price/25/30');
    expect(res1.status).to.be.equal(200);
    expect(res1.body).to.be.an('array');
    expect(res1.body.length).to.be.equal(1);
    expect(res1.body[0]).to.be.an('object');
    expect(res1.body[0].performer).to.be.equal('John Doe');

    const res2 = await request(server).get('/api/concerts/price/25/50');
    expect(res2.body.length).to.be.equal(2);
  });

  it('/concerts/day/:day should return all concerts for the specified day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
    expect(res.body[0]).to.be.an('object');
    expect(res.body[0].performer).to.be.equal('John Doe');
  });
  // router.get('/concerts/price/:price_min/:price_max', ConcertController.getByMinMaxPrice);

});