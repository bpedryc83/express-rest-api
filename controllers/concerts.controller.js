const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const foundConcert = await Concert.findOne().skip(rand);
    if(!foundConcert) res.status(404).json({ message: 'Not found' });
    else res.json(foundConcert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const foundConcert = await Concert.findById(req.params.id);
    if(!foundConcert) res.status(404).json({ message: 'Not found' });
    else res.json(foundConcert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: parseInt(price), day: parseInt(day), image: image });
    await newConcert.save();
    res.json({ message: 'post: OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOne = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const foundConcert = await Concert.findById(req.params.id);
    if(foundConcert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: parseInt(price), day: parseInt(day), image: image }});
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
    const foundConcert = await Concert.findById(req.params.id);
    if(foundConcert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'delete: OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};