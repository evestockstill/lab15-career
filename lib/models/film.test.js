/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Film = require('./Film');


describe('Film model', () => {
  it('has a required title', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Please add a title');
  });
  it('has a title less than 50 characters', () => {
    const film = new Film({
      title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      overview: 'The murderous, backwoods Firefly family take to the road to escape a vengeful police force which is not afraid of being',
      releaseDate: new Date
    });
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Title can not be more than 50 characters');
  });
});
it('has a required releaseDate', () => {
  const film = new Film();
  const { errors } = film.validateSync();

  expect(errors.releaseDate.message).toEqual('Path `releaseDate` is required.');
});
it('has a day get virtual', () => {
  const film = new Film({
    releaseDate: new Date('2019-12-20T00:00:00')
  });
  expect(film.day).toEqual(20);
});
it('has a day set', () => {
  const film = new Film({
    releaseDate: new Date('2019-12-20T00:00:00')
  });
  film.day = 21;
  expect(film.releaseDate).toEqual(new Date('2019-12-21T00:00:00'));
});
it('has a month get', () => {
  const film = new Film({
    releaseDate: new Date('2019-11-11T00:00:00')
  });
  expect(film.month).toEqual(11);
});
it('has a month set', () => {
  const film = new Film({
    releaseDate: new Date('2019-12-11T00:00:00')
  });
  film.month = 12;
  expect(film.releaseDate).toEqual(new Date('2019-12-11T00:00:00'));
});
it('has a year get', () => {
  const film = new Film({
    releaseDate: new Date('2020-12-11T00:00:00')
  });
  expect(film.year).toEqual(2020);
});
it('has a year set', () => {
  const film = new Film({
    releaseDate: new Date('2019-12-11T00:00:00')
  });
  film.year = 2020;
  expect(film.releaseDate).toEqual(new Date('2020-12-11T00:00:00'));
});
   
