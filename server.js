const express = require('express');
const cors = require('cors');
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

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Connected socket: ', socket.id);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const message404 = { message: '404 not found' };

app.use((req, res) => {
  res.status(404).json(message404);
});