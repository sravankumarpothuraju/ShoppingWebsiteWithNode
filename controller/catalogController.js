var express = require('express');
var router = express.Router();
var itemDb = require('../models/ItemDB');
const item = require('../models/item');
const  user = require('../models/User');
const  userDB = require('../models/UserDB');
const useritem = require('../models/UserItem');
const userprofile = require('../models/UserProfile');
const bodyParser = require('body-parser');

let urlEncodedParser = bodyParser.urlencoded({extended: false});


/* GET home page. */
router.get('/', function(req, res, next) {
  var username = "";
  if(req.session.theUser != undefined){
    username = req.session.theUser.firstName + " " + req.session.theUser.lastName;
  }
  res.render('index',{username:username});
});

/* GET Categories page. */
router.get('/categories',async function(req, res) {
try{
  username="";
  if(req.session.theUser != undefined){
    username = req.session.theUser.firstName + " " + req.session.theUser.lastName;
  }

  //var itemModel = require('../utility/ItemDB.js');
  var listOfCategories = await itemDb.getCategories();
  var listOfItems = await itemDb.getItems();
  console.log("List of items ::"+listOfItems);
  if(listOfCategories.length == 0 || listOfItems.length == 0){
    res.render('error');
  }

  var data ={
    list:listOfCategories,
    items:listOfItems
  }
  res.render('categories',{
    data:data,
    username:username
  });
  console.log("data in items"+data)
}
catch(err){
  console.log("in categories controller: ",err);
}
});

/* GET Contact page. */

router.get('/contact', function(req, res, next) {
  var username = "";
    if(req.session.theUser != undefined){
      username = req.session.theUser.firstName + " " + req.session.theUser.lastName;
    }
    res.render('contact',{username:username});
});
/* GET About page. */

router.get('/about', function(req, res, next) {
  var username = "";
    if(req.session.theUser != undefined){
      username = req.session.theUser.firstName + " " + req.session.theUser.lastName;
    }
    res.render('about',{username:username});
});


/* GET Item page. */

router.get('/categories/item', async function(req, res, next) {
  var reqParam=req.query;
 itemCode = reqParam['item-code'];
    console.log("Item Code:"+itemCode);
    var itemObj = await itemDb.getItem(itemCode);
    console.log("Item viewItem Code:"+itemObj);

        var username = "";
  var rating = "";
  purchasedIt = "";
  if(req.session.theUser != undefined){

    username = req.session.theUser.firstName + " " + req.session.theUser.lastName;
    var userProfile = req.session.currentUserProfile;
    var userItems = userProfile.userItems;
    //var isItemSaved
    console.log("in rating finder: ");
    for(var i=0; i< userItems.length; i++){
     console.log("In Request action:: "+userItems[i].item.itemCode);
      if(userItems[i].item.ItemCode == itemCode){
     var isItemSaved = 1 ;
   }
   else{
     isItemSaved=0;
   }
 }
    userProfile.userItems.forEach(function(item){
      if(item.item.itemCode === itemObj[0].itemCode){
        rating = item.rating;
      }
    });
  }
//if itemcode is valid go in if orelse redirect ot 404 page
  if(itemObj.length!=0){
  res.render('item',{
    item:itemObj[0],
    username:username,
    rating:rating,
    userItems:userItems,
    isItemSaved:isItemSaved

  });
  }
  else{
    res.render('error');
  }
});

/* GET feedback page. */

router.get('/feedback',async(request, response) => {
  const requestParams = request.query;
  var itemcode = requestParams['item-code'];
  console.log("item code in feedback"+itemcode)
  let itemObj = await itemDb.getItem(itemcode);
  if(itemObj.length==0){
    response.render('error');
  }else{
    var username = "";
    if(request.session.theUser != undefined){
      username = request.session.theUser.firstName + " " + request.session.theUser.lastName;
      var userProfile = request.session.currentUserProfile;
      var userItems = userProfile.userItems;
      counter=0;
      //checking if item exists in the userProfile
      userItems.forEach(function(item){
        if(item.item.ItemCode === itemcode){
          counter+=1;
        }
      });
      //checking if request came form myItems page and
      //if the item request to update is actually form the table inmyItems
      //If not redirecting to myItems page without any updation
    /**  if(counter == 0 ){
        response.redirect('/profile/myitems');
      }**/
      var purchasedIt = "No";
      var rating = 0;
      userItems.forEach(function(item){
        if(item.item.ItemCode === itemObj[0].itemcode){
          purchasedIt = item.purchasedIt;
          rating = item.rating;
        }
      });
    }

    response.render('feedback',{
      item:itemObj[0],
      username:username,
      purchasedIt:purchasedIt,
      rating:rating
    });
  }
  /**if(typeof itemObj === "undefined"){
    response.redirect('/catagories');
  }

  const id = request.session.theuser.userId;
  const currentItem = userprofile.getCurrentItemByCode(id, String(itemcode));
  const stars = parseInt(currentItem.rating);
  itemObj.rating = stars;
  response.render('feedback.ejs', {"item":itemObj, "isTested":currentItem.testedIt});**/

});


var categories = [];

let getCategories = function() {
    // get the category of each item
    var data = itemDb.getItems();
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }

    });
    return categories;
};

module.exports = router;
