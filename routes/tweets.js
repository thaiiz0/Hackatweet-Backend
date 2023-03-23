var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');

// Création du tweet.
 router.post('/createTweet', (req, res) => {
    const date = new Date();
    User.findOne({username: req.body.username})
    .then(data => {
        if(data){

           const newTweet = new Tweet({
            firstname: req.body.firstname,
            username: req.body.username,
            message: req.body.message,
            /* nbLike: req.body.nbLike,
            date: date,
            isLiked: false,
            hashtags
             */
        });

    newTweet.save().then(newDoc => {
        res.json({tweet: newDoc})
    });        
    }
    })
 })


 // Récupérer tweet.
 router.get('/', (req, res) => {
    Tweet.find()
    .then(data => {
        res.json({data: data})
    });
 });



 // Supprimer tweet.
 router.delete('/deleteTweet/:_id', (req, res) => {
    Tweet.findByIdAndDelete({ _id: req.paramq._id })
    .then(data => {
        if (data) {
            res.json({result: true, data: data})
        }
        else {
            res.json({result: false, error: 'Tweet not found'})
        }
    }); 
 });






module.exports = router;