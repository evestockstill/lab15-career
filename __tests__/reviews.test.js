require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

describe('review routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let film;
  let review;
  beforeEach(async() => {
    film = await Film.create({
      title: 'fun times',
      genre: 'comedy',
      overview: 'its a great time'
    });

    review = await Review.create({
      filmId: film._id,
      review: 'It was good',
      rating: 5
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        filmId: film._id,
        review: 'It was good',
        rating: 5
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          filmId: film._id.toString(),
          review: 'It was good',
          rating: 5,
          __v: 0
        });
      });
  });

  // it('gets all reviews', async() => {
  //   const reviews = await Review.create([
  //     { filmId: film._id, review: 'one good review', rating: 3 },
  //     { filmId: film._id, review: 'two good review', rating: 2 },
  //     { filmId: film._id, review: 'three good review', rating: 3 },
  //     { filmId: film._id, review: 'four good review', rating: 5 },
  //   ]);

  //   return request(app)
  //     .get('/api/v1/reviews')
  //     .then(res => {
  //       reviews.forEach(review => {
  //         expect(res.body).toContainEqual(JSON.parse(JSON.stringify(review)));
  //       });
  //     });
  // });

  it('gets an review by id', async() => {
    return request(app)
      .get(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          filmId: JSON.parse(JSON.stringify(film)),
          review: 'It was good',
          rating: 5,
          __v: 0
        });
      });
  });

  it('updates an review by id', async() => {
    return request(app)
      .patch(`/api/v1/reviews/${review._id}`)
      .send({ rating: 4 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          filmId: film._id.toString(),
          review: 'It was good',
          rating: 4,
          __v: 0
        });
      });
  });

  it('deletes an review by id', async() => {
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          filmId: film._id.toString(),
          review: 'It was good',
          rating: 5,
          __v: 0
        });
      });
  });
});
