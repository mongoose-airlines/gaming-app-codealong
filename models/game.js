const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  reviewer: String,
  score: { type: Number, min: 1, max: 10 },
  review: String
}, {
  timestamps: true
})

const gameSchema = new Schema({
  title: String,
  slug: String,
  rawgId: Number,
  released: Date,
  platform: String,
  imageUrl: String,
  videoUrl: String,
  metacriticScore: Number,
  favoritedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  reviews: [reviewSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);