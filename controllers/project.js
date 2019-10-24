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
    db.User.update({_id:req.params.id},{$pull:{projects:{$in:{_id:{$eq:req.params.projectId}}}}})
    res.json({status:200,data:"yeet"})
}

module.exports = {
    showProject,
    deleteProject,
  };