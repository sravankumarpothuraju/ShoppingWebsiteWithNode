var express = require('express');
var app = express();
var itemModel = require('./item');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wallmartCollection',{ useNewUrlParser: true },function(err){
  if(err) throw err;
  console.log("Database Successfully connected!!");
});


//databse for items in the application
var itemsSchema = mongoose.Schema({
  ItemCode:{type:String, required:true, unique: true},
  ItemName:String,
  CatalogCategory:String,
  Description:String,
  Rating:Number,
  ImageURL:String
},{collection:'itemsData'});

var items = mongoose.model('itemsData', itemsSchema);




//Get all the items
exports.getItems = async function(){
  console.log("In getItems");
  return await items.find();
};


//Get a single selected item
exports.getItem = async function(ItemCode){
  console.log("In getItems DB: ",ItemCode);
  return await items.find({'ItemCode':ItemCode});
}

//Get all the categories of catalog
exports.getCategories = async function(){
  console.log("in get categories");
  var listOfCategories = [];
  await items.find(function(err,data){
    if(err){
      throw err;
    }else{
      data.forEach(function(item){
        if(!listOfCategories.includes(item.CatalogCategory)){
          listOfCategories.push(item.CatalogCategory);
        }
      });
    }
  });
  console.log(listOfCategories);
  return listOfCategories;
}


// Hard coded data
/*var odyssey=
    {
        ItemCode: 'B_001',
        ItemName: "The Odyssey by Homer",
        CatalogCategory: "Books",
        Description: "The Iliad and the Odyssey can be found on every list of the world's greatest books. From the beginning of Western literature, readers have appreciated these two epic poems for their ability to make us reflect on the full range of human concerns and emotions as well as for sheer entertainmen",
        Rating: "3",
        ImageURL: "../resources/images/odyssey.jpg"

    }
var hamlet =    {
        ItemCode: 'B_002',
        ItemName: "Hamlet by William Shakespeare",
        CatalogCategory: "Books",
        Description: "Hamlet is a tragedy by William Shakespeare, believed to have been written between 1599 and 1601. The play, set in Denmark, recounts how Prince Hamlet exacts revenge on his uncle Claudius, who has murdered Hamlet's father, the King, and then taken the throne and married Hamlet's mother",
        Rating: "3",
        ImageURL: "../resources/images/hamlet.jpg"
    }


var ulysses = {
        ItemCode:'B_003',
        ItemName: "Ulysses by James Joyce",
        CatalogCategory: "Books",
        Description: "Ulysses is a novel by Irish writer James Joyce. It was first serialised in parts in the American journal The Little Review from March 1918 to December 1920, and then published in its entirety by Sylvia Beach in February 1922, in Paris. It is considered to be one of the most important works of Modernist literature, and has been called a demonstration and summation of the entire movement",
        Rating: 3,
        ImageURL: "../resources/images/ulysses.jpeg"
    }


var airpods =    {
        ItemCode:'E_001',
        ItemName: "Apple Air pods",
        CatalogCategory: "Electronics",
        Description: "Amazingly easy to use, AirPods combine intelligent design with breakthrough technology and crystal clear sound.Get up to 5 hours of listening time on one charge Or up to 3 hours with just a 15-minute charge in the charging case..",
        Rating: 3,
        ImageURL: "../resources/images/Appleairpods.jpg"
    }

  var watch =  {
        ItemCode: "E_002",
        ItemName: "Apple watch",
        CatalogCategory: "Electronics",
        Description: "Monitor your health. Track your workouts. Get the motivation you need to achieve your fitness goals. And stay connected to the people and information you care about. With Apple Watch Series 3, you can do it all — right from your wrist",
        Rating: 3,
        ImageURL: "../resources/images/applewatch.jpg"
    }

  var tv =  {
        ItemCode: 'E_003',
        ItemName: "Apple 4k Tv",
        CatalogCategory: "Electronics",
        Description: "Immerse yourself in billions of mesmerizing colors and crisp, vivid imagery on our stunning Samsung TV.",
        Rating: 3,
        ImageURL: "../resources/images/samsung1.jpg"
    }

module.exports.odyssey=odyssey;
module.exports.hamlet=hamlet;
module.exports.ulysses=ulysses;
module.exports.airpods=airpods;
module.exports.watch=watch;
module.exports.tv=tv;
*/
