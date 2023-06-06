const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const path = require('path');
const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
const socket = require('socket.io');

const app = express();

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.use(express.static(path.join(__dirname, '/client/build')));

const message404 = { message: '404 not found' };

mongoose.connect('mongodb+srv://testing-user:eukaliptus@cluster0.a8mpj12.mongodb.net/db', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Connected socket: ', socket.id);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json(message404);
});