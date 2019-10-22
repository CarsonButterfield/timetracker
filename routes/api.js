const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Current Path = /api/v1

// ----------------------------- AUTH -------------------------- //

router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);


// ----------------------------- PROFILE -------------------------- //

router.get('/profile/:userId', ctrl.auth.showProfile);

module.exports = router;

//-------------------------------NEW DATA --------------------------//

router.post('/newProject',ctrl.create.newProject)