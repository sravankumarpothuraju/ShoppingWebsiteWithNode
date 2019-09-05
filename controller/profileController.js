const express = require('express');
const item = require('../models/item');
const  user = require('../models/User');
const  userDB = require('../models/UserDB');
//const  itemDB = require('../utility/itemDB');
const useritem = require('../models/UserItem');
const userprofile = require('../models/UserProfile');
const bodyParser = require('body-parser');
const userAccessRouter = require('./userAccess');
const signinUser = userAccessRouter.signinUser;
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


//myFavorite Categories
router.get('/myItems',async function(req,res){

  try{

    //check if session variable is set or not
    var theUser = req.session.theUser;
    console.log("USer check :"+theUser)
    if( theUser == undefined){
      var user = await userDB.getUsers();
      if(user == null){
        res.render('error');
      }
      req.session.theUser = user;
      req.session.currentUserProfile = await userDB.getUserProfile(user.userId);
      var currentUserProfile = req.session.currentUserProfile;
      if(req.session.currentUserProfile.length == 0){
        res.render('error');
      }
      req.session.success = true;
      console.log(user);
      res.render('myItems', {
          success: true,
          userId: req.session.theUser.userId,
          userItems: currentUserProfile.userItems,
          username : user.firstName + " " + user.lastName,
      });


    }
    //session variable to not null
      else if(theUser != null || theUser != undefined){
        var user = req.session.theUser;
        req.session.currentUserProfile =await userDB.getUserProfile(user.userId);
        var currentUserProfile = req.session.currentUserProfile;
        var action = req.query.action;
    //if no action is given then redirect to myItems page
        if(action == undefined){
          res.render('myItems',{
            success:true,
            userId: user.userId,
            username: user.firstName + " " + user.lastName,
            userItems: currentUserProfile.userItems
          });
        }

      }


  }
  catch(err){
    console.log("in items error: ");
    console.log(err);
  }

  });

router.get('/save', async (request, response) => {
  try{
  var user = request.session.theUser;
  request.session.currentUserProfile =await userDB.getUserProfile(user.userId);
  var currentUserProfile = request.session.currentUserProfile;
  var userItems= currentUserProfile.userItems;
  console.log("Current User Profile details ::"+userItems.length);
  const requestParams = request.query;
    itemCode = requestParams['item-code'];
        //  console.log("In SAVE action : ",itemCode);
          var itemPresent = false;
          //check if already present!!
          for(var i=0; i< userItems.length; i++){
           console.log("In Request action:: "+userItems[i].item.itemCode);
            if(userItems[i].item.ItemCode == itemCode){
              //alert that the item already present!!
              console.log("item already present!!");
              itemPresent= true;
            }
          }
          //If item not present
          if(!itemPresent){
            var item =await itemDb.getItem(itemCode);
            console.log("item in save otem"+item);
            var userItem =await useritem(item,0,"No");
            console.log("userItem in save otem"+userItem);
            //use actions present in userProfile to perform delete action
            await userDB.addItem(user.userId, userItem);
          }
          response.redirect('/profile/myItems');
        }
        catch(err){
          console.log("in items add error: ");
          console.log(err);
        }

});
router.post('/delete', urlEncodedParser, async (request, response) => {
  try{
  var user = request.session.theUser;
  request.session.currentUserProfile =await userDB.getUserProfile(user.userId);
  var currentUserProfile = request.session.currentUserProfile;
  const queryString = request.body;
    const itemCode = queryString['item-code'];
  //var itemCode = request.query.itemCode;
  console.log("In delete action : ",itemCode);

  await userDB.removeItem(user.userId,itemCode);
  response.redirect('/profile/myItems');
}
catch(err){
  console.log("in items delete error: ");
  console.log(err);
}
})

router.post('/update-rating', urlEncodedParser, async (request, response) => {
  try{
  const queryString = request.body;
  const itemCode = queryString['item-code'];
  console.log("itemcode in update rating"+itemCode);
  const rating = queryString['user-rating'];
    console.log("rating in update rating"+rating);
  //const id = request.session.theuser.userId;
  //console.log(id);
  var item =await itemDb.getItem(itemCode);
  console.log("In items of user profile router data ::"+item)
    item.rating = rating;
    request.session.currentUserProfile =await userDB.getUserProfile(request.session.theUser.userId);
    var currentUserProfile = request.session.currentUserProfile;
    var userItems=currentUserProfile.userItems;
    //console.log("In items of user profile router data testt "+test
    for(var i=0; i< userItems.length; i++){
     console.log("In Request action:: "+userItems[i].item.itemCode);
      if(userItems[i].item.ItemCode == itemCode){
     var purchasedIt = currentUserProfile.userItems[i].purchasedIt;
   }
 }
    var userItem = useritem(item,rating,purchasedIt);
    //req.session.currentUserProfile.updateItem(userItem);
    await userDB.updateItem(request.session.theUser.userId, userItem);
    response.redirect('myItems');
  }
  catch(err){
    console.log("in update errror!! : ",err);
  }

  /**const currentItem = userprofile.getCurrentItemByCode(id, String(itemcode));
  console.log(currentItem);
   if(typeof currentItem !== "undefined"  && (parseInt(rating) >=0 && parseInt(rating) <= 5)){
  let updatedUserItem = new useritem(id, itemcode, currentItem.itemName, currentItem.category, String(rating), currentItem.testedIt);
  userprofile.updateItem(updatedUserItem);
}
  response.redirect('/profile/myitems');**/

});



router.post('/update-tested', urlEncodedParser, async (request, response) => {
  try{
  const queryString = request.body;
  const itemcode = queryString['item-code'];
  const purchasedIt = queryString['purchased-it'];
  console.log("purchasedIt");
  console.log(purchasedIt);

  var item =await itemDb.getItem(itemcode);
   //var rating= item.rating;
   item.purchasedIt = purchasedIt;
    request.session.currentUserProfile =await userDB.getUserProfile(request.session.theUser.userId);
    var currentUserProfile = request.session.currentUserProfile;
    var userItems=currentUserProfile.userItems;
    //console.log("In items of user profile router data testt "+test
    for(var i=0; i< userItems.length; i++){
     console.log("In Request action:: "+userItems[i].item.itemCode);
      if(userItems[i].item.ItemCode == itemcode){
     var rating = currentUserProfile.userItems[i].rating;
     console.log("Current rating::"+rating);
   }
  }
    var userItem = useritem(item,rating,purchasedIt);
    //req.session.currentUserProfile.updateItem(userItem);
    await userDB.updateItem(request.session.theUser.userId, userItem);
    response.redirect('myItems');
  }
  catch(err){
    console.log("in update errror!! : ",err);
  }

});



module.exports = router;
