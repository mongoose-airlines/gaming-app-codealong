const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  gameCollection: [{ type: Schema.Types.ObjectId, ref: 'Game' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);