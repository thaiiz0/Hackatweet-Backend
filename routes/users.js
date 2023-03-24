var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody'); 


//Inscription compte : 
router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['username', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }
      User.findOne({ username: req.body.username }).then(data => {
        if (data === null) {
          const hash = bcrypt.hashSync(req.body.password, 10);
    
          const newUser = new User({
            firstname: req.body.firstname,
            username: req.body.username,
            password: hash,
            token: uid2(32),
          });
    
          newUser.save().then(newDoc => {
            res.json({ result: true, data: {username: newDoc.username, token: newDoc.token }});
          });
        } else {
          res.json({ result: false, error: 'User already exists' });
        }
      });
    });


    // Connexion Compte :
    router.post('/signin', (req, res) => {
        if (!checkBody(req.body, ['username', 'password'])) {
          res.json({ result: false, error: 'Missing or empty fields' });
          return;
        }
      
        User.findOne({ username: req.body.username }).then(data => {
          if (data && bcrypt.compareSync(req.body.password, data.password)) {
            res.json({ result: true, firstname: data.firstname, username: data.username, token: data.token });
          } else {
            res.json({ result: false, error: 'User not found or wrong password' });
          }
        });
      });

    // Log out du compte :



module.exports = router;
