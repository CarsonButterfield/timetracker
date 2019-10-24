const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Current Path = /api/v1

// ----------------------------- AUTH -------------------------- //

router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);


// ----------------------------- PROFILE -------------------------- //

router.get('/profile/:userId', ctrl.auth.showProfile);
router.get('/project/:projectId', ctrl.project.showProject);

// Show all users
router.get('/all', ctrl.auth.showAll);


//-------------------------------NEW DATA --------------------------//

router.post('/newProject', ctrl.create.newProject)

// Set start time
router.post('/startTime/:projectId', ctrl.create.newTimeStamp);

// set end time
router.put('/stopTime/:projectId/:workingTimeId', ctrl.create.newStopTime);


//------------------------------- DELETE DATA --------------------------//

// remove all record for particular day
// router.delete('/remove/:projectId/:day', ctrl.remove.dayRecords);

module.exports = router;
