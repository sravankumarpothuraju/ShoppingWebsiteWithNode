var item = function(ItemCode,ItemName,CatalogCategory,Description,Rating,ImageURL){

  itemModel ={

    ItemCode:ItemCode,
    ItemName:ItemName,
    CatalogCategory:CatalogCategory,
    Description:Description,
    Rating:Rating,
    ImageURL:ImageURL
  };
  return itemModel;
}

module.exports.item = item;
