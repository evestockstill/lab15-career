/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Film = require('./Film');


describe('Film model', () => {
  it('has a required title', () => {
    const film = new Film();
    const { errors } = film.validateSync();
    expect(errors.title.message).toEqual('Please add a title');
  });

  it('has a title and overview field', () => {
    const film = new Film({
      
      title: 'Devils Rejects',
      overview: 'The murderous, backwoods Firefly family take to the road to escape a vengeful police force which is not afraid of being as ruthless as their target.'
    });
    expect(film.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Devils Rejects',
      overview: 'The murderous, backwoods Firefly family take to the road to escape a vengeful police force which is not afraid of being as ruthless as their target.'
    });
  });
  it('has a required releaseDate', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.releaseDate.message).toEqual('Path `releaseDate` is required.');
  });
  it('has a day get virtual', () => {
    const film = new Film({
      releaseDate: new Date('2019-12-10T00:00:00')
    });
    expect(film.day).toEqual(10);
  });
  it('has a day set', () => {
    const film = new Film({
      releaseDate: new Date('2019-12-10T00:00:00')
    });
    film.day = 11;
    expect(film.releaseDate).toEqual(new Date('2019-12-11T00:00:00'));
  });
  it('has a month get', () => {
    const film = new Film({
      releaseDate: new Date('2019-10-11T00:00:00')
    });
    expect(film.month).toEqual(10);
  });
  it('has a month set', () => {
    const film = new Film({
      releaseDate: new Date('2019-12-11T00:00:00')
    });
    film.month = 10;
    expect(film.releaseDate).toEqual(new Date('2019-10-11T00:00:00'));
  });
  it('has a year get', () => {
    const film = new Film({
      releaseDate: new Date('2010-12-11T00:00:00')
    });
    expect(film.year).toEqual(2010);
  });
  it('has a year set', () => {
    const film = new Film({
      releaseDate: new Date('2019-12-11T00:00:00')
    });
    film.year = 2018;
    expect(film.releaseDate).toEqual(new Date('2018-12-11T00:00:00'));
  });
});

   
