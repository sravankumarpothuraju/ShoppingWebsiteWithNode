/*
var userprofile={"129":[{item:'The Odyssey by Homer',category:'Books',rating:'5',purchasedIt:'yes'},{item:'Apple Air pods',category:'Electronics', rating:'4',purchasedIt:'no'}],
"149":[{item:'Apple Air pods',category:'Electronics', rating:'4',purchasedIt:'no'}]};

var userprofile1={"129":[{item:'The Odyssey by Homer',category:'Books',rating:'5',purchasedIt:'yes'},{item:'Apple Air pods',category:'Electronics', rating:'4',purchasedIt:'no'}],
"149":[{item:'Apple Air pods',category:'Electronics', rating:'4',purchasedIt:'no'}]};
*/
/*
function addItem(userId,userItem){
  if(Object.keys(userprofile).includes(userId)){

    let currentitems = userprofile[userId];
    for(var i=0;i<currentitems.length;i++){
      if(currentitems[i].item == userItem.item){
        return;
      }
    }

    currentitems.push(userItem);
    userprofile[userId]=currentitems;
  }
  else{
    userprofile[userId] = [userItem];
  }
}
function removeItem(userId,item){
  if(Object.keys(userprofile).includes(userId)){
    let currentuseritems=userprofile[userId];

    let index;
    for (let i=0;i<currentuseritems.length;i++){
    if(currentuseritems[i].item === item){
        index=i;
      }
    }

    currentuseritems.splice(index,1);
    userprofile[userId] = currentuseritems;
  }

  }
    function updateItem(userId,itemObj){

      if(Object.keys(userprofile).includes(userId)){
        let currentuseritems=userprofile[userId];
        let index;
        for (let i=0;i<currentuseritems.length;i++){
          if(currentuseritems[i].item===itemObj.item.ItemName){
            index=i;

          }
        }

        currentuseritems[index] = {item:itemObj.item.ItemName,category:itemObj.item.CatalogCategory,rating:itemObj.rating,purchasedIt:itemObj.purchasedIt};
        userprofile[userId] = currentuseritems;
      }


}

function getItems(userId){
  //console.log(userId);
  if(Object.keys(userprofile).includes(userId)){
    //console.log(userId);
    let currentuseritems=userprofile[userId];
  return currentuseritems;
}

}
function emptyProfile(userId) {

  if(Object.keys(userprofile).includes(userId)){
    //console.log('empty profile');
    userprofile[userId]=userprofile1[userId];
  }
}





module.exports = {
   "addItem": addItem,
   "removeItem":removeItem,
   "updateItem":updateItem,
   "getItems":getItems,
   "emptyProfile":emptyProfile,
   "userProfile":userprofile,
 };
*/


var userProfile = function(userId, userItems){

  this.userId = userId;
  this.userItems = userItems;

//Add a new item to the userItems list
  this.addItem = function(userItem){
    console.log("Add userItem");
    this.userItems.push(userItem);
  };

//Remove an item from the userItems list
  this.removeItem = function(itemCode){
    console.log("Remove userItem");
    for(var i=0;i<this.userItems.length;i++){
      if(itemCode == this.userItems[i].item.itemCode){
        this.userItems.splice(i,1);
        break;
      }
    }
  };

//Update a userItem in the userItems list
  this.updateItem = function(userItem){
    console.log("Update userItem",userItem.item.itemCode);
    for(var i = 0; i < this.userItems.length; i++ ){
      console.log("in updateItem forloop: ",this.userItems[i].item.itemCode);
      if(userItem.item.itemCode == this.userItems[i].item.itemCode){
        this.userItems[i].item = userItem.item;
        this.userItems[i].rating = userItem.rating;
        this.userItems[i].rented = userItem.rented;
      }
    }
  };

//Get all the userItems
  this.getItems = function(){
    return this.userItems;
  };

//empty the profile
  this.emptyProfile = function(){
    console.log("Empty the profile");
    this.user = null;
    this.userItems = null;
  };
}

module.exports = userProfile;
