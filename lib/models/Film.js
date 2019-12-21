/* eslint-disable no-undef */
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  releaseDate: {
    type: Date,
    required: true
  },
  genres: {
    type: String
  },
  overview: {
    type: String
  }
}, {
  id: false,
  toJSON: { virtuals: true }
});
schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'filmId'
});


schema.virtual('day')
  .get(function() {
    return this.releaseDate.getDate();
  })
  .set(function(day) {
    return this.releaseDate.setDate(day);
  });

schema.virtual('month')
  .get(function() {
    return this.releaseDate.getMonth() + 1;
  })
  .set(function(month) {
    this.releaseDate.setMonth(month - 1);
  });
schema.virtual('year')
  .get(function() {
    return this.releaseDate.getFullYear();
  })
  .set(function(year) {
    this.releaseDate.setYear(year);
  });

module.exports = mongoose.model('Film', schema);
