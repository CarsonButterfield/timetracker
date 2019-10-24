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
        user.save((err,user)=>{
            if(err) return console.log(err)
            console.log(user)
            

        })
        console.log(user)
        res.json({status:201,data:user.projects})
    })
    
    
}

const newTimeStamp = (req, res) => {
    // console.log("user ID: ==>>>" + req.session.currentUser);
    db.User.findById(req.session.currentUser, (err, user)=>{
        if(err){console.log(err)
            return
        }
        const foundProject = user.projects.find(project => project._id.toString() === req.params.projectId)
        // console.log("project ID ===>> " + foundProject._id);
        let newTimeStamp = req.body;
        foundProject.workingTime.push(newTimeStamp);
        user.save((err, user)=>{
            if (err) console.log(err);
            // console.log(user);
        })
        let timeStampObject = foundProject.workingTime[foundProject.workingTime.length-1];

         res.json({
             status: 201,
             data: timeStampObject,
             newTimeStamp: newTimeStamp,
         })
    })
}       


const newStopTime = (req, res) => {
    db.User.findById(req.session.currentUser, (err, user)=>{
        if(err){console.log(err)
            return
        }
        const foundProject = user.projects.find(project => project._id.toString() === req.params.projectId)
        console.log("project ID ===>> " + foundProject);
        const foundWorkingTime = foundProject.workingTime.find(time => time._id.toString() === req.params.workingTimeId)
        let newStopTime = new Date();
        foundWorkingTime.endTime = newStopTime;
        user.save((err, user)=>{
            if (err) console.log(err);
            // console.log(user);
        })

         res.json({
             status: 201,
             data: foundWorkingTime,
             newStopTime: newStopTime,
         })
    })
}

module.exports = {
    newProject,
    newTimeStamp,
    newStopTime,
}