const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const foundTestimonial = await Testimonial.findOne().skip(rand);
    if(!foundTestimonial) res.status(404).json({ message: 'Not found' });
    else res.json(foundTestimonial);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const foundTestimonial = await Testimonial.findById(req.params.id);
    if(!foundTestimonial) res.status(404).json({ message: 'Not found' });
    else res.json(foundTestimonial);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'post: OK' });

  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putOne = async (req, res) => {
  try {
    const { author, text } = req.body;
    const foundTestimonial = await Testimonial.findById(req.params.id);
    if(foundTestimonial) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
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
    const foundTestimonial = await Testimonial.findById(req.params.id);
    if(foundTestimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'delete: OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};