var express = require('express');
var router = express.Router();

var UserModel = require('../models/UserModel');

//import "bcryptjs" library
var bcrypt = require('bcryptjs');
var salt = 8; 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resouurce');
});

router.post('/register', async (req, res) => {
  try {
      var userRegistration = req.body;
      var hashPassword = bcrypt.hashSync(userRegistration.password, salt);
      var user = {
          username: userRegistration.username,
          password: hashPassword,
          role : "admin"
      }
      await UserModel.create(user);
      res.send(user)
  } catch (err) {
      res.send(err)
  }
});

router.post('/login', async (req, res) => {
  try {
      var userLogin = req.body;
      var user = await UserModel.findOne({ username: userLogin.username })
      if (user) {
          var hash = bcrypt.compareSync(userLogin.password, user.password)
          if (hash) {
              //initialize session after login success
              req.session.username = user.username;
              res.send(user);
          }
          else {
              res.send("sai");
          }
      }
  } catch (err) {
      res.send(err)
  }
});

module.exports = router;
