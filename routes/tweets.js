var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const Hashtag = require('../models/hashtags');
const { checkBody } = require('../modules/checkBody'); 



 router.post('/createATweet', (req, res) => {
    if (!checkBody(req.body, ['message'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    
    User.findOne({token: req.body.token})
    .then(data => {
        if(data) {
            const pattern = /\s([#][\w_-]+)/g;
            const hashtags = req.body.message.match(pattern);
            const newTweet = new Tweet({
            firstname: req.body.firstname,
            username: req.body.username,
            message: req.body.message,
            token: req.body.token,
            date: new Date(),
            nbLike: 0,
            hashtags: hashtags,
            isliked: false,

        });

    newTweet.save().then(() =>  {
        res.json({ result: true, message: newTweet})
    });        
    }
    })
});

 // Récupérer tweet.
 router.get("/", (req, res) => {
    Tweet.find({ hashtag: req.params.hashtag }).then(
      (data) => {
        if (data) {
          res.json({ result: true, data: data });
        } else {
          res.json({ result: false });
        }
      }
    );
  });
 
   // Supprimer tweet.
 router.delete('/:token', (req, res) => {
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