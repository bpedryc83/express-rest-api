const express = require('express');
const { v4: uuidv4 } = require('uuid');
const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

const messageOK = { message: 'ok' };
const message404 = { message: '404 not found' };

app.get('/testimonials/random', (req, res) => {
  res.send(db.testimonials[(Math.floor(Math.random() * (db.length)))]);
});

app.get('/testimonials', (req, res) => {
  res.send(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.send(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const randomKey = uuidv4();
  const { author, text } = req.body;
  db.testimonials.push({id: randomKey, author: author, text: text});
  res.json(messageOK);
});

app.put('/testimonials/:id', (req, res) => {
  const reqIDObject = db.testimonials.find(item => item.id == req.params.id);
  const indexInArray = db.testimonials.indexOf(reqIDObject);
  const { author, text } = req.body;
  db.testimonials[indexInArray] = {id: req.params.id, author: author, text: text};
  res.send('Put: ok');
});

app.delete('/testimonials/:id', (req, res) => {
  const reqIDObject = db.testimonials.find(item => item.id == req.params.id);
  const indexInArray = db.testimonials.indexOf(reqIDObject);
  db.testimonials.splice(indexInArray, 1);
  res.send('Delete: ok');
});

app.use((req, res) => {
  res.status(404).json(message404);
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});