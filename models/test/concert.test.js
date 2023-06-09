const Concert = require('../concert.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert', () => {

  it('should throw an error if no all arguments exist', () => {
    const variants = [{}, { performer: 'John Doe'}, { genre: 'Rock'}, { performer: 'John Doe', genre: 'Rock'}, {performer: 'John Doe', genre: 'Rock', price: 25, day: 1}];
    for (let variant of variants) {
      const con = new Concert(variant); // create new Concert, but don't set `name` attr value
      con.validate(err => {
        expect(
          err.errors.performer ||
          err.errors.genre ||
          err.errors.price ||
          err.errors.day ||
          err.errors.image
        ).to.exist;
      });
    }
  });

  it('should throw an error if "performer" is not a string', () => {

    const variants = [{}, []];
    for(let variant of variants) {
      const con = new Concert({performer: variant});
      con.validate(err => {
        expect(err.errors.performer).to.exist;
      });
    }
  });

  it('should throw an error if "genre" is not a string', () => {

    const variants = [{}, []];
    for(let variant of variants) {
      const con = new Concert({ genre: variant });
      con.validate(err => {
        expect(err.errors.genre).to.exist;
      });
    }
  });

  it('should throw an error if "price" is not a number', () => {

    const variants = ['string', {}, []];
    for(let variant of variants) {
      const con = new Concert({price: variant});
      con.validate(err => {
        expect(err.errors.price).to.exist;
      });
    }
  });

  it('should throw an error if "day" is not a number', () => {

    const variants = ['string', {}, []];
    for(let variant of variants) {
      const con = new Concert({price: variant});
      con.validate(err => {
        expect(err.errors.price).to.exist;
      });
    }
  });

  it('should throw an error if "image" is not a string', () => {

    const variants = [{}, []];
    for(let variant of variants) {
      const con = new Concert({image: variant});
      con.validate(err => {
        expect(err.errors.image).to.exist;
      });
    }
  });

  it('should not throw an error if all arguments exist', () => {
    const variants = [ 
      {performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '1.jpg'},
      {performer: 'Amanda', genre: 'Pop/Soul', price: 50, day: 2, image: '/pictures/6.png'}
    ];
    for(let variant of variants) {
      const con = new Concert(variant);
      con.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

});