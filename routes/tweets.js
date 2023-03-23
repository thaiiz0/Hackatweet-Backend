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
            /* date: date,
            avatar: req.body.avatar,
            nbLike: req.body.nbLike,
            isLiked: false, */
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
 router.delete('/deleteTweet', (req, res) => {
    
 })






module.exports = router;