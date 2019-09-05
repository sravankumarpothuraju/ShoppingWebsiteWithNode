var express = require('express');
var app = express();
//Required
var itemDBModel = require('./ItemDB');
var item=require('./item')
var userModel = require('./User');
var userItemModel = require('./UserItem');
var userProfileModel = require('./UserProfile');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wallmartCollection',{ useNewUrlParser: true },function(err){
  if(err) throw err;
  console.log(" Database Successfully connected!!");
});

//user database
var userSchema = mongoose.Schema({
  userId : {type:String, required:true, unique: true},
  firstName : String,
  lastName : String,
  email : String,
  password: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zipCode: Number,
  country: String

},{collection:'userData'});

//items linked tp the user
var userItemSchema = mongoose.Schema({
  userId:{type:String, required:true},
  item : {
    ItemCode:{type:String, required:true},
    ItemName:String,
    CatalogCategory:String,
    Description:String,
    Rating:Number,
    ImageURL:String
  },
  rating : String,
  purchasedIt : String
},{collection:'userItemData'});


var user = mongoose.model('userData',userSchema);
var userItem = mongoose.model('userItemData',userItemSchema);

//Defining users to login
// var user1 = userModel.user('usr001','Abhi','Peddireddy','abhi@collections.com');
// var user2 = userModel.user('usr002','Naga','Reddy','naga@collections.com');


//Return list of all the users
//For now I'm returning the first user.
exports.getUsers = async function(){
  console.log("in get users");
  var usr=null;
  await user.find(function(err, data){
    if(err) {
      throw err;
    }
    else{
      usr = data[0];
    }
  });
  return usr;
}

//Return a particular users
exports.getUser = async function(id){
  console.log("in get user");
  var usr=null;
  await user.find({'userId':id},function(err, data){
    if(err) {
      throw err;
    }
    else{
      usr = data;
    }
  });
  return usr;
}

//Return profile for a particular user
exports.getUserProfile =async function(userId){

  if(userItem){
      console.log(await userItem.find({"userId": userId}));
      return new userProfileModel(userId, await userItem.find({"userId": userId}));

  }
}

//remove the userItem form the database
exports.removeItem = async function(userId,ItemCode){
  console.log("in removeItem userDB");
  if(userItem){
    console.log(userId+" : "+ItemCode);
    var item =await userItem.find({'userId':userId, 'item.ItemCode':ItemCode}).deleteOne();
  }
}

//Add the userItem to the database
exports.addItem = async function(userId, uItem){
  console.log("in addItem userDB",uItem.item[0]);
  if(userItem){
    console.log(userId+" : "+uItem);
    var item = new userItem({
      'userId' : userId,
      'item' : {
        'ItemCode':uItem.item[0].ItemCode,
        'ItemName':uItem.item[0].ItemName,
        'CatalogCategory':uItem.item[0].CatalogCategory,
        'Description':uItem.item[0].Description,
        'Rating':uItem.item[0].Rating,
        'ImageURL':uItem.item[0].ImageURL
      },

      'rating' : uItem.rating,
      'purchasedIt' : uItem.purchasedIt
    });
    await item.save(function(err){
      if(err) console.log(err);
      console.log("userItem has been saved successfully!!");
    });
  }
}


//Update the userItem to the database
exports.updateItem = async function(userId, uItem){
  console.log("in updateItem userDB");
  if(userItem){
    console.log(userId+" : "+uItem);
    await userItem.update({'userId':userId, 'item.ItemCode':uItem.item[0].ItemCode},{'rating' :uItem.rating,'purchasedIt' :uItem.purchasedIt},function(err,data){
      if(err) console.log(err);
      console.log("Data modified? ",data.nModified);
      console.log("userItem has been updated successfully!!");
    });
  }
}



/*
var user=require('./user')

var sravan= user('129','sravan','pothuraju','spothura@uncc.edu','9532 grove side','apt 1892','charlotte','northcarolina','28262','united states');
var ravi= user('149','ravi','kumar','ravi@uncc.edu','977 green  ville side','apt 1822','atlanta','atlanta','28762','united states');
var getUsers=function()
{
    var userlist=
        [
          sravan,
          ravi
        ];
    return userlist;

};

console.log(getUsers)
module.exports.getUsers=getUsers;
*/
