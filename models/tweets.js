const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  firstname: String,  
  username: String,
  message: String,
  /* nbLike: Number,
  date: Date,
  isLiked: Boolean,
  
  hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'hashtags' }], */
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;