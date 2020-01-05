// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const Review = require('./Review');


describe('Review model', () => {
  it('has a required filmId', () => {
    const review = new Review();
    const { errors } = review.validateSync();
    expect(errors.filmId.message).toEqual('Path `filmId` is required.');
  });

  it('has a required rating', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('please leave a rating 1-10');
  });

  it('has a rating 1 or above', () => {
    const review = new Review({
      rating: 0
    });
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
  });

  it('has a rating 10 or below', () => {
    const review = new Review({
      rating: 11
    });
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (11) is more than maximum allowed value (10).');
  });
});
