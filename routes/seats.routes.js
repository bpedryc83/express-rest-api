const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db');

const messageOK = { message: 'ok' };
const message404 = { message: 'The slot is already taken' };

router.route('/seats/random').get((req, res) => {
  res.send(db.seats[(Math.floor(Math.random() * (db.length)))]);
});

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.send(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const randomKey = uuidv4();
  const { day, seat, client, email } = req.body;
  const isReserved = db.seats.find(item => (item.day == day && item.seat == seat));
  console.log(isReserved);
  if (!isReserved) {
    db.seats.push({id: randomKey, day: day, seat: seat, client: client, email: email});
    req.io.emit('seatsUpdated', db.seats);
    res.json(messageOK);
  }
  else {
    res.status(404).json(message404);
  }
});

router.route('/seats/:id').put((req, res) => {
  const reqIDObject = db.seats.find(item => item.id == req.params.id);
  const indexInArray = db.seats.indexOf(reqIDObject);
  const { day, seat, client, email } = req.body;
  db.seats[indexInArray] = {id: req.params.id, day: day, seat: seat, client: client, email: email};
  res.send('Put: ok');
});

router.route('/seats/:id').delete((req, res) => {
  const reqIDObject = db.seats.find(item => item.id == req.params.id);
  const indexInArray = db.seats.indexOf(reqIDObject);
  db.seats.splice(indexInArray, 1);
  res.send('Delete: ok');
});

module.exports = router;