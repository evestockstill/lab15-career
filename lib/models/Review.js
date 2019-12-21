const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
    required: [true, 'please leave a rating 1-10'],
    min: 1,
    max: 10
  }
});
module.exports = mongoose.model('Review', schema);
