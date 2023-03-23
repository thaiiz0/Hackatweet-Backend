const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  firstname: String,  
  username: String,
  avatar: String,
  tweet: String,
  date: Date,
  isLiked: Boolean,
  nbLike: Number,
  hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'hashtags' }],
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;