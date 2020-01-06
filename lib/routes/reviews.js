const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()

  .post('/', (req, res) => {
    Review
      .create(req.body)
      .then(review => res.send(review));
  })

  .get('/', (req, res) => {
    Review
      .find()
      .select({ review: false })
      .then(reviews => res.send(reviews));
  })

  .get('/:id', (req, res) => {
    Review
      .findById(req.params.id)
      .populate('filmId')
      .then(review => res.send(review));
  })

  .patch('/:id', (req, res) => {
    Review
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(review => res.send(review));
  })

  .delete('/:id', (req, res) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review));
  });
