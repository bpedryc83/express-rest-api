const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts/performer/:performer', ConcertController.getByPerformer);
router.get('/concerts/genre/:genre', ConcertController.getByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getByMinMaxPrice);
router.get('/concerts/day/:day', ConcertController.getByDay);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getOne);
router.post('/concerts', ConcertController.postOne);
router.put('/concerts/:id', ConcertController.putOne);
router.delete('/concerts/:id', ConcertController.deleteOne);

module.exports = router;