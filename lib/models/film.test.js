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
it('has a required genre', () => {
  const film = new Film();
  const { errors } = film.validateSync();

  expect(errors.genre.message).toEqual('Path `genre` is required.');
});

   
