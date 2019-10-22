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


module.exports = {
    newProject,
}