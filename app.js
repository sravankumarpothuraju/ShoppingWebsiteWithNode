const express = require('express');
const session = require('express-session');
var http = require('http');


const catalogController = require('./controller/catalogController');
const userAccessRouter = require('./controller/UserAccess.js');
const userProfileRouter = require('./controller/profileController.js');



var app = express();
app.use(session({secret:'secret-session'}));
app.set('view engine','ejs');
app.use('/resources',express.static('resources'));



app.use('/', catalogController);
app.use('/user', userAccessRouter.router);
app.use('/profile', userProfileRouter);
// app.use('/myitems', catalogController);
// app.use('/categories',catalogController);
// app.use('/categories/item',catalogController);
// app.use('/feedback', catalogController);
// app.use('/contact', catalogController);
// app.use('/about', catalogController);




app.listen(8080,()=>{
  console.log("Application running in port number 8080");
});
