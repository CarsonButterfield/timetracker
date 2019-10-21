const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const app = express();
const db = require('./models')
const session = require('express-session');
const PORT = process.env.PORT || 5000;
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'Dont Tell',
   resave: true, // save session on every request
    saveUninitialized: false, // Only save session if session exists on req object.
  }));
console.log(db)

app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`)
})

app.get('/',(req,res)=> {
    res.send('meep beep')
})

app.post('/signup',(req,res) => {
    console.log('beep')
    console.log(req.body)
    db.User.findOne({email:req.body.email},(err,foundUser)=>{
        console.log('meep')
        if(err){
            console.loglog('1')
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
        console.log('1.5')
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ 
              status: 500,
              error: [{ message: 'Something went wrong. Please try again' }],
            });
            console.log('2')
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
    
})

app.post('/login',(req,res) => {
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
})
app.get('/profile',(req,res)=>{
    res.sendFile('views/profile.html', {
        root: `${__dirname}/`
      });
})
app.get('/api/v1/profile/:id',(req,res) => {
   console.log('server hit')
   res.status(200).json({
       meep:'beep'
   })

})