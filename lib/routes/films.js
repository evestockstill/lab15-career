const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');

module.exports = Router()

  .get('/', async(req, res, next) => {
    let filmQuery = {};
    if(req.query.film) {
      filmQuery = { 'films.title': req.query.film };
    }
    Film
      .find(filmQuery)
      .select({ title: true })
      .then(films => res.send(films));
  })
  .post('/', (req, res) => {
    Film
      .create(req.body)
      .then(film => res.send(film));
  })
  .get('/:id', (req, res) => {
    Film
      .findById(req.params.id)
      .populate('films')
      .then(film => {
        res.send(film);
      });
  })

  .patch('/:id', (req, res) => {
    Film
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(film => res.send(film));
  })

  .delete('/:id', (req, res) => {
    Promise.all([
      Film.findByIdAndDelete(req.params.id),
      Review.deleteMany({ filmId: req.params.id })
    ])
      .then(([film]) => res.send(film));
  });