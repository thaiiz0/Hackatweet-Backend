const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  firstname: String,  
  username: String,
  date: Date,
  message: String,
  nbLiked: Number,
  hashtags: [String],
  likes: [String],
  
});


const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;