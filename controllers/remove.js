const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const db = require('../models');


// remove a day record 
const deleteDayRecords = (req,res) => {
    console.log("deleting a day record...");
    db.User.findById(req.session.currentUser, (err, user)=>{
        if(err){console.log(err)
            return
        }
        const foundProject = user.projects.find(project => project._id.toString() === req.params.projectId)
        console.log("project ID ===>> " + foundProject);
        const foundWorkingDayList = foundProject.workingTime.filter(time => new Date(time.day.toString()) === new Date(req.params.workingDay));
        console.log("foundWorkingDayList =====>>>>");
        console.log(foundWorkingDayList);
        foundWorkingDayList.forEach((record)=>{
            delete foundProject.workingTime[record._id];
        })

        user.save((err, user)=>{
            if (err) console.log(err);
            console.log("user after deleting====>>>>");
            console.log(user);
        })

         res.json({
             status: 201,
             data: foundWorkingTime,
             newStopTime: newStopTime,
         })
    })
}

module.exports = {
    deleteDayRecords,
  };



