var UserItem = function(item,rating,purchasedIt){

  userItemModel = {
    item : item,
    rating : rating,
    purchasedIt : purchasedIt
  }
  return userItemModel;
}



module.exports=UserItem;
