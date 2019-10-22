const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const db = require('../models');
db.User.find({}, (err,user)=> console.log(user))

// POST Create User
const createUser = (req, res) => {
    console.log(req.body)
    db.User.findOne({email:req.body.email},(err,foundUser)=>{
    if(err){
        res.json({
            status:400,
            err,
        })
        return
    }
    if(foundUser){
        res.json({
            status:400,

        })
        return
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json({ 
          status: 500,
          error: [{ message: 'Something went wrong. Please try again' }],
        });
        // Bcrypt takes password and salt
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong. Please try again' }],
          });
  
          const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hash
          };
  
          db.User.create(newUser, (err, createdUser) => {
              console.log('3')
            if (err) return res.status(500).json({
              status: 500,
              error: [{ message: 'Something went wrong. Please try again' }],
            });
  
            res.status(201).json({
              status: 201,
              
            });
          });
        });
      })
    })
};

const createSession = (req, res) => {
    {
        console.log('Request session object --> ', req.session);
        db.User.findOne({ email: req.body.email }, (err, foundUser) => {
          if (err) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong. Please try again' }],
          });
      
          // If no user is found by email address
          if (!foundUser) return res.status(400).json({
            status: 400,
            error: [{ message: 'Username or password is incorrect' }],
          });
      
          bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({
              status: 500,
              error: [{ message: 'Something went wrong. Please try again' }],
            });
      
            if (isMatch) {
              req.session.currentUser = foundUser._id;
              console.log(req.session)
              return res.status(201).json({
                status: 201,
                data: { id: foundUser._id },
              });
            } else {
              return res.status(400).json({
                status: 400,
                error: [{ message: 'Username or password is incorrect' }],
              });
            }
          });
        });
    }
};

// GET Show Profile
const showProfile = (req, res) => {
  console.log(req)
   let userId = req.params.userId
   console.log(userId)
   db.User.findOne({_id:userId},(err,user)=>{
       console.log('searching')
       if(err){console.log(err)
        return
    }
  
    else{
        res.json({
            status:201,
            data:user,
        })
    }
   })

}

// Show All user and their data
const showAll = (req,res)=> {
    db.User.find({}, (err, allUsers)=>{
        if (err) {
            console.log(err);
            return
    } else {
        res.json({
            status: 201,
            data: allUsers,
        });
    }
})
}

// Show all projects
const showAllProjects = (req, res)=> {
    db.Project.find({}, (err, allProjects)=>{
        if (err) {
            console.log(err);
            return
    } else {
        res.json({
            status: 201,
            data: allProjects,
        });
    }
})
}

module.exports = {
    createUser,
    createSession,
    showProfile,
    showAll,
    showAllProjects,

  }