const members = require('./members');
const logger = require('./middlewares/logger');
const path=require('path');

//Import express module using require()
const express= require('express');

//Instantiate express server using 'express()'
const app = express();
const PORT = process.env.PORT || 8080;

//Express-Handlebars: These are used to render the REQUEST/RESPONSE objects easily instead of using APIs/"HTTP request middlewares".
/*
In order to use handlebars, we need to 
1) Install "express-handlebars" package
2) import(require) express-handlebars
3) Load the "handlebars" engine middleware and set its defaultLayout to "main" and
4) Finally Set the engine to "handlebars"
For more details read npm documentation... 
*/

//3 Import express-handlebars
const exphbs = require("express-handlebars");

//4 Load "handlebars" engine
app.engine("handlebars",exphbs({defaultLayout:"main"}));

//5 Set the engine to "handlebars"
app.set("view engine", "handlebars");

//Using handlebars
//Root middleware using "handlebars"
app.get("/",(req, res)=>res.render("index",{title:"I'm On!",members}));/*render() is a 'handlebars' functionality and "index" here refers 
to "index.handlebars" file in "views" folder which is managed by 'handlebars'. */


/*Root middleware Using "Static HTML" pages
If we do this way, we will have to create middleware for every route. A simple solution would be making 
the folder static, to load and serve static files. This allows us to create as many static html files and access them directly.
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public','index.html'));
}) */
//Creating static folder
app.use(express.static(path.join(__dirname,'public')));


//Body-parser
/*
When a POST request is made, the URL contains the data to be posted. But this will be encoded in its body and
can NOT be directly used. So we use a body-parser. The Body-parser middleware will decode/recieve the data 
encoded in URL's body when a POST request is made.
**The body parser middleware should be loaded(USED) chronologically BEFORE any POST request is made.
*/
app.use(express.json());
app.use(express.urlencoded({extended:false})); //This is a body-parser.


//using an express ROUTER
app.use('/api/members',require("./routes/api/members route"));

//Simple logger middleware
app.use(logger);



//Listen express server on some port
app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
});
