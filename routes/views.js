const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// get home
router.get('/', (req, res) => {
  res.sendFile('views/login.html', {
    root: `${__dirname}/../`
  });
});


// --------- Profile --------//

// GET User Profile
router.get('/profile/:userId', (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect('/login');
      }

    res.sendFile('views/profile.html', {
        root: `${__dirname}/../`
    });
    
});



// GET Project Page
// I'll add Project Id later //
router.get('/project', (req, res)=> {
    console.log("building project page");
    res.sendFile('views/profile/project_page.html', {
        root: `${__dirname}/../`
    })
})


module.exports = router;