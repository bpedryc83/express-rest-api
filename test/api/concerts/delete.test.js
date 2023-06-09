const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {

  before(async () => {
    const testDepOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '1.jpg' });
    await testDepOne.save();
  
    const testDepTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Amanda Doe', genre: 'Soul', price: 50, day: 2, image: '6.png' });
    await testDepTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  });

  it('/:id should delete chosen document and return success', async() => {
    const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
    const deletedConcert = await Concert.findOne({ _id: '5d9f1140f10a81216cfd4408' });
    expect(res.status).to.be.equal(200);
    expect(deletedConcert).to.be.null;
    const notDeletedConcert = await Concert.findOne({ _id: '5d9f1159f81ce8d1ef2bee48' });
    expect(notDeletedConcert).to.not.be.null;
  });

});