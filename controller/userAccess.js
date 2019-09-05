const express = require('express');
const item = require('../models/Item');
const  user = require('../models/User');
const  userDB = require('../models/UserDB');
const useritem = require('../models/UserItem');
const userprofile = require('../models/UserProfile');
const bodyParser = require('body-parser');
var itemDb = require('../models/ItemDB');


let urlEncodedParser = bodyParser.urlencoded({extended: false});
// const getItems = importItemUtility.getItems;
// const getItem = importItemUtility.getItem;
// const getItemsByCategory = importItemUtility.getItemsByCategory;

const router = express.Router();

router.use( (request, response, next) => {
    response.locals.is_user = request.session.theuser;
    next();
});

router.get('/signin', (request, response) => {
  response.redirect('/profile/myItems');
});

router.get('/signout', (request, response) => {
  request.session.theUser = undefined;
  request.session.currentProfile = undefined;
  response.redirect("/");
});

const signinUser = (request) => {
  const usersList = userDB.getUsers();
  let max = usersList.length-1;
  let index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
  request.session.theuser = usersList[index];
  userprofile.setDefaulUserItems(request.session.theuser.UserId);
};

module.exports = {
  "router":router,
  "signinUser": signinUser
};
