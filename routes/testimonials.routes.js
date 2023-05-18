const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db');

const messageOK = { message: 'ok' };

router.route('/testimonials/random').get((req, res) => {
  res.send(db.testimonials[(Math.floor(Math.random() * (db.length)))]);
});

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  res.send(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const randomKey = uuidv4();
  const { author, text } = req.body;
  db.testimonials.push({id: randomKey, author: author, text: text});
  res.json(messageOK);
});

router.route('/testimonials/:id').put((req, res) => {
  const reqIDObject = db.testimonials.find(item => item.id == req.params.id);
  const indexInArray = db.testimonials.indexOf(reqIDObject);
  const { author, text } = req.body;
  db.testimonials[indexInArray] = {id: req.params.id, author: author, text: text};
  res.send('Put: ok');
});

router.route('/testimonials/:id').delete((req, res) => {
  const reqIDObject = db.testimonials.find(item => item.id == req.params.id);
  const indexInArray = db.testimonials.indexOf(reqIDObject);
  db.testimonials.splice(indexInArray, 1);
  res.send('Delete: ok');
});

module.exports = router;