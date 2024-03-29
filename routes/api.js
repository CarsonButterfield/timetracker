const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Current Path = /api/v1

// ----------------------------- AUTH -------------------------- //

router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);


// ----------------------------- PROFILE -------------------------- //
router.get('/logout', ctrl.auth.logout)
router.get('/profile/:userId', ctrl.auth.showProfile);
router.get('/project/:projectId', ctrl.project.showProject);
router.delete('/project/:projectId',ctrl.project.deleteProject)
// Show all users
router.get('/all', ctrl.auth.showAll);


//-------------------------------NEW DATA --------------------------//

router.post('/newProject', ctrl.create.newProject)

// Set start time
router.post('/startTime/:projectId', ctrl.create.newTimeStamp);

// set end time
router.put('/stopTime/:projectId/:workingTimeId', ctrl.create.newStopTime);

// edit start/end time:
router.put('/edit/:projectId/:timeId/:topic/:startTime/:endTime', ctrl.create.updateDayRecord);

//------------------------------- DELETE DATA --------------------------//

// remove all record for particular day
router.put('/remove/:projectId/:day', ctrl.remove.deleteDayRecords);

module.exports = router;
