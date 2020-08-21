const members = require('./members');
const logger = require('./logger');

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

//Simple logger middleware
app.use(logger);



//Sample routing for GET request
app.get('/api/members',(req, res)=>{
    res.json(members);
});


//Listen express server on some port
app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
});
