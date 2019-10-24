const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const db = require('../models');
db.User.find({}, (err,user)=> console.log(user))

// Show project bu Id
const showProject = (req, res)=> {
    console.log("user ID: ==>>>" + req.session.currentUser);
    db.User.findById(req.session.currentUser, (err, user)=>{
        if(err){console.log(err)
            return
        }
        const foundProject = user.projects.find(project => project._id.toString() === req.params.projectId)
        console.log("foundProject ID ===>> " + foundProject._id);
        console.log(foundProject.projectName);
         res.json({
             status: 201,
             data: foundProject,
             req: req.params.projectId,
         })
    })
}

const deleteProject = (req,res) => {
    console.log('deleting')
    if(!req.session.currentUser){
        res.redirect('/')
        return
    }
    console.log(req.params.projectId)
    
  db.User.findOne({_id:req.session.currentUser},(err,user)=> {
      if(err){
        console.log({err})
        res.json({status:400,err})
        return
            }
    let filteredLogs = user.projects.filter((project) =>{
        
        return project._id != req.params.projectId
    })

    user.projects = filteredLogs
    user.save((err,user)=> {
        if(err){
            res.json({status:400,data:"Save Error"})
            return
        }
        res.json({status:201,data:"updated user"})
    })
  })
    
}

module.exports = {
    showProject,
    deleteProject,
  };