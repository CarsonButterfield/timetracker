const mongoose = require('mongoose')
const db = require('../models');
console.log('beep')

const newProject = (req,res) => {
    console.log({user:req.session.currentUser,body:req.body})
    if(!req.session.currentUser){
        res.json({
            status:400,
            data:"You are not logged in"
        })
        return
    }
    let newProject = req.body
    let userId = req.session.currentUser
    db.User.findOne({_id:userId},(err,user)=> {
        if (err) return console.log(err)
        user.projects.push(newProject)
        console.log(user)
        res.json({status:201,data:user.projects})
    })
    
    
}

const newTimeStamp = (req, res) => {
    console.log("user ID: ==>>>" + req.session.currentUser);
    db.User.findById(req.session.currentUser, (err, user)=>{
        if(err){console.log(err)
            return
        }
        const foundProject = user.projects.find(project => project._id.toString() === req.params.projectId)
        console.log("project ID ===>> " + foundProject._id);
        let newTimeStamp = req.body;
        foundProject.workingTime.push(newTimeStamp);
        user.save((err, user)=>{
            if (err) console.log(err);
            console.log(user);
        })

         res.json({
             status: 201,
             data: foundProject,
             newTimeStamp: newTimeStamp,
         })
    })
}

module.exports = {
    newProject,
    newTimeStamp,
}