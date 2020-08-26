const members = require('./members');
const logger = require('./middlewares/logger');

//Import express module using require()
const express= require('express');

const path=require('path');

//Instantiate express server using 'express()'
const app = express();
const PORT = process.env.PORT || 8080;

/*Root middleware
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
