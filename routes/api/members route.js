//require express
const express = require('express');

//Instatiate an express.Router object
const router = express.Router();

//Import required files/modules
const members = require("../../members");
const uuid = require("uuid");


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
    if(resu.length > 0) res.json(resu);
    else {
        res.status(400).json({"Invalid id":`No member found with id ${req.params.id}`});
    }
})

//POST request are usually used to add data to the Database
//router definition to a POST request.
router.post("/register",(req, res)=>{
    members.push({id: uuid.v4(), name:req.body.name, email:req.body.email, status:"active"});
    res.json(members);
})

//PUT requests are made to update the "existing" entry in the database.
//router definition for a PUT request
router.put("/updatedetail/:id",(req, res)=>{
    let mem = req.body;
    let found = members.some(member => member.id == mem.id);
    if(found){
        members.forEach(member => {
            if(member.id == mem.id){
                member.name = mem.name?mem.name:member.name;
                member.email = mem.email?mem.email:member.email;
                res.json("Update successful: " + JSON.stringify(members));
            }
        })
    }
    else{
        res.status(400).send(`Member not found with id ${mem.id}`);
    }
})

//DELETE requests are made inorder to delete the "existing" entry in the database.
//router definition for a DELETE request
router.delete("/delete/:id",(req, res)=>{
    let mem = req.body;
    let exist = false;
    let index = null;
    for(let i=0; i<members.length; i++){
        if(members[i].id == mem.id){
            exist = true;
            index = i;
            break;
        }
    }
    if(exist){
        members.splice(index,1);
        res.json({msg: "Deletion successful", members:members});
    }
    else{
        res.status(400).json(`Could not delete. Member not found with id ${mem.id}`);
    }
})

//exporting the router
module.exports = router;