const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const db = require('../models');
db.User.find({}, (err,user)=> console.log(user))

// Show project details:
const showProject = (req, res)=> {
    console.log(req.body)
    db.Project.findOne({ _id: req.params.projectId }, (err, project)=>{
        console.log('searching')
        if(err){console.log(err)
         return
     }
   
     else{
         res.json({
             status:201,
             data: project,
         })
     }
    })
}



module.exports = {
    showProject,

  };