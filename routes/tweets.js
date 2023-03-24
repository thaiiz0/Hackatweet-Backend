var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const Hashtag = require('../models/hashtags');


 router.post('/createATweet', (req, res) => {
    User.findOne({username: req.body.username})
    .then(data => {
        if(data) {
           const newTweet = new Tweet({
            firstname: req.body.firstname,
            username: req.body.username,
            message: req.body.message,
            date: new Date(),
            nbLiked: 0,
            hashtags: [],
            likes: [],
        });

    newTweet.save().then(newDoc => {
        res.json({tweet: newDoc})
    });        
    }
    })
});


 // Récupérer tweet.
 router.get('/:token', (req, res) => {
    Tweet.find()
    .then(data => {
        if(data) {
            res.json({
            firstname: req.body.firstname,
            username: req.body.username,
            date: new Date(),
            message: req.body.message,
            nbLiked: 0,
            likes: [],
            })

        }
    })
 })
 
   // Supprimer tweet.
 router.delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete({ _id: req.params.id })
    .then(data => {
        if (data) {
            res.json({result: true, tweet_id: tweet_id })
        }
        else {
            res.json({result: false, error: 'Tweet not found'})
        }
    }); 
 });



// get Tweets with specific hashtags.
router.get("/:hashtag/:token", (req, res) => {
    Tweet.find({ hashtag: req.params.hashtag })
    .then((data) => {
        if (data) {
          res.json({ result: true, username: req.body.username, hashtags: req.body.hashtags, message: req.body.message });
        } else {
          res.json({ result: false });
        }
      }
    );
  });


// Liké Tweets
router.put("/likeATweet", (req, res) => {
    Tweet.find({ username: req.body.username, token: req.body.token, tweetId: req.body.tweetId})
    .then((data) => {
        if (data) {
            res.json({result: true, tweet_id: tweet_id, likes: req.body.likes})
        } else {
            res.json({result: false});
        }
    })
})
  

module.exports = router;