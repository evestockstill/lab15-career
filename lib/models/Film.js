/* eslint-disable no-undef */
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  genre: {
    type: String,
    required: true
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




module.exports = mongoose.model('Film', schema);
