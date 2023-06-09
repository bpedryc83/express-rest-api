const Concert = require('../concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/concertsDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testConOne = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '1.jpg' });
      await testConOne.save();
  
      const testConTwo = new Concert({ performer: 'Amanda Doe', genre: 'Soul', price: 50, day: 2, image: '6.png' });
      await testConTwo.save();
    });
  
    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });

    it('should return a proper image for "performer" with "findOne" method', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      const expectedImage = '1.jpg';
      expect(concert.image).to.be.equal(expectedImage);
    });

    after(async () => {
      await Concert.deleteMany();
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const concert = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '1.jpg' });
      await concert.save();
      expect(concert.isNew).to.be.false;
    });

    after(async () => {
      await Concert.deleteMany();
    });

  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testConOne = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '1.jpg' });
      await testConOne.save();
    
      const testConTwo = new Concert({ performer: 'Amanda Doe', genre: 'Soul', price: 50, day: 2, image: '6.png' });
      await testConTwo.save();
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Concert.updateOne({ performer: 'John Doe' }, { $set: { performer: 'John Doe The Second' }});
      const updatedConcert = await Concert.findOne({ performer: 'John Doe The Second' });
      expect(updatedConcert).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      concert.performer = 'John Doe The Second';
      await concert.save();
    
      const updatedConcert = await Concert.findOne({ performer: 'John Doe The Second' });
      expect(updatedConcert).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Concert.updateMany({}, { performer:'New Performer' });
      const concerts = await Concert.find();
      for (let concert of concerts) {
        expect(concert.performer).to.be.equal('New Performer');
      }
    });
  
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testConOne = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '1.jpg' });
      await testConOne.save();
    
      const testConTwo = new Concert({ performer: 'Amanda Doe', genre: 'Soul', price: 50, day: 2, image: '6.png' });
      await testConTwo.save();
    });
    
    afterEach(async () => {
      await Concert.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Concert.deleteOne({ performer: 'John Doe' });
      const removedConcert = await Concert.findOne({ performer: 'John Doe' });
      expect(removedConcert).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      await concert.remove();
      const removedConcert = await Concert.findOne({ performer: 'John Doe' });
      expect(removedConcert).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Concert.deleteMany({});
      const removedConcert = await Concert.find();
      expect(removedConcert.length).to.be.equal(0);
    });
  
  });
});