const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  firstname: String,  
  username: String,
  date: Date,
  message: String,
  nbLiked: Number,
  hashtags: Array,
  likes: Array,
  
  
});


const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;