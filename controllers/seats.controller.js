const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const foundSeat = await Seat.findOne().skip(rand);
    if(!foundSeat) res.status(404).json({ message: 'Not found' });
    else res.json(foundSeat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const foundSeat = await Seat.findById(req.params.id);
    if(!foundSeat) res.status(404).json({ message: 'Not found' });
    else res.json(foundSeat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const isReserved = await Seat.findOne({ $and: [{ day: parseInt(day), seat: parseInt(seat) }]});
    if (!isReserved) {
      const newSeat = new Seat({ day: parseInt(day), seat: parseInt(seat), client: client, email: email });
      await newSeat.save();
      const allBookedSeats = await Seat.find();
      req.io.emit('seatsUpdated', allBookedSeats);
      res.json({ message: 'post: OK' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOne = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const foundSeat = await Seat.findById(req.params.id);
    if(foundSeat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: parseInt(day), seat: parseInt(seat), client: client, email: email }});
      res.json({ message: 'put: OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const foundSeat = await Seat.findById(req.params.id);
    if(foundSeat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'delete: OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};