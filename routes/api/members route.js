//require express
const express = require('express');

//Instatiate an express.Router object
const router = express.Router();

//Import required files/modules
const members = require("../../members");

//A router is similar to normal express object but is used to group similar routes into a single file.
//Routers help in keeping the code clean and organized

//defining a router request.
/*
    Here we treat this as a seperate ROOT(/) path because the reference to this route will be specified in the 
    calling path and everything here onwards is relative path. This is the parent directory for all the 
    routes within. */

//router definition to GET all members details
router.get('/',(req, res)=>{
    res.json(members);
});

//router definition to GET single member details
router.get('/:id',(req, res)=>{
    let resu = members.filter(member => member.id === parseInt(req.params.id));
    if(resu.length > 0) res.json(members.filter(member => member.id === parseInt(req.params.id)));
    else {
        res.status(400).json({"Invalid id":`No member found with id ${req.params.id}`});
    }
})

//POST request are usually used to add data to the Database
//router definition to a POST request.
router.post("/",(req, res)=>{
    res.json(req.body);
})

//exporting the router
module.exports = router;