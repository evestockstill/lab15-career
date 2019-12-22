require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

describe('film routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let film;
  let reviews;
  beforeEach(async() => {
    film = await Film.create({
      title: 'fun times',
      genre: 'comedy',
      overview: 'its a great time'
    });

    reviews = await Review.create([
      {
        filmId: film._id,
        review: 'It was good',
        rating: 5
      }
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'more fun times',
        genre: 'comedy',
        overview: 'its a great time'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'more fun times',
          genre: 'comedy',
          overview: 'its a great time',
          __v: 0
        });
      });
  });

  it('gets all films', async() => {
    const films = await Film.create([
      { title: 'first film', overview: 'its one overview', genre: 'comedy' },
      { title: 'second film', overview: 'its two overview', genre: 'horror' },
      { title: 'third film', overview: 'its three overview', genre: 'drama' }
    ]);
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          expect(res.body).toContainEqual({
            _id: film._id.toString(),
            title: film.title
          });
        });
      });
  });

  it('gets a film by id', async() => {
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'fun times',
          genre: 'comedy',
          overview: 'its a great time',
          __v: 0
        });
      });
  });

  it('updates a film by id', async() => {
    return request(app)
      .patch(`/api/v1/films/${film._id}`)
      .send({ title: 'good first film' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'good first film',
          genre: 'comedy',
          overview: 'its a great time',
          __v: 0
        });
      });
  });

  it('deletes a film by id', async() => {
    return request(app)
      .delete(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'fun times',
          genre: 'comedy',
          overview: 'its a great time',
          __v: 0
        });

        return Review.find();
      })
      .then(reviews => {
        expect(reviews).toHaveLength(0);
      });
  });
});
