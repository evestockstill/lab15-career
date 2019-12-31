require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can signup a user with email and password', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'eve@evie.com', password: 'Puppies', role: 'user' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'eve@evie.com',
          __v: 0
        });
      });
  });
  it('can login a user with email and password', async() => {
    const user = await User.create({
      email: 'eve@evie.com',
      password: 'Puppies',
      role: 'user'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'eve@evie.com', password: 'Puppies', role: 'user' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: user.id,
          email: 'eve@evie.com',
          __v: 0
        });
      });
  });
  it('fails when a bad email is used', async() => {
    await User.create({ email: 'eve@evie.com', password: 'Puppies', role: 'user' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'eve@eve.com', password: 'Puppies', role: 'user' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });
  it('fails when a bad password is used', async() => {
    await User.create({ email: 'eve@evie.com', password: 'Puppies' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'eve@evie.com', password: 'Puppy', role: 'user' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });
  it('can verify if a user is logged in', async() => {
    const user = await User.create({
      email: 'eve@evie.com',
      password: 'Puppies',
      role: 'user'
    });

    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'eve@evie.com', password: 'Puppies', role: 'user' });
    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'eve@evie.com',
          __v: 0
        });
      });
  });
});
