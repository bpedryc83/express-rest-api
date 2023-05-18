const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db');

const messageOK = { message: 'ok' };

router.route('/concerts/random').get((req, res) => {
  res.send(db.concerts[(Math.floor(Math.random() * (db.length)))]);
});

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.send(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const randomKey = uuidv4();
  const { performer, genre, price, day, image } = req.body;
  db.concerts.push({id: randomKey, performer: performer, genre: genre, price: price, day: day, image: image});
  res.json(messageOK);
});

router.route('/concerts/:id').put((req, res) => {
  const reqIDObject = db.concerts.find(item => item.id == req.params.id);
  const indexInArray = db.concerts.indexOf(reqIDObject);
  const { performer, genre, price, day, image } = req.body;
  db.concerts[indexInArray] = {id: req.params.id, performer: performer, genre: genre, price: price, day: day, image: image};
  res.send('Put: ok');
});

router.route('/concerts/:id').delete((req, res) => {
  const reqIDObject = db.concerts.find(item => item.id == req.params.id);
  const indexInArray = db.concerts.indexOf(reqIDObject);
  db.concerts.splice(indexInArray, 1);
  res.send('Delete: ok');
});

module.exports = router;