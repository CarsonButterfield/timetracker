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

        console.log("req.params.day: " + req.params.day);
        console.log(foundProject.workingTime[0].day);
        const updatedWorkingDayList = foundProject.workingTime.filter(time => {
            console.log(time.day.toString(), new Date(req.params.day).toString());
            return time.day.toString() !== new Date(req.params.day).toString();
        });
        // console.log("foundWorkingDayList =====>>>>");
        // console.log(foundWorkingDayList);
        // idToDelete = []
        // foundWorkingDayList.forEach((record)=>{
        //     idToDelete.push(record._id);
        //     // delete foundProject.workingTime.find()[record._id];
        // })
        foundProject.workingTime = updatedWorkingDayList;

        user.save((err, user)=>{
            if (err) console.log(err);
            console.log("user after deleting====>>>>");
            console.log(user);
        })

         res.json({
             status: 201,
             data: user,
         })
    })
}

module.exports = {
    deleteDayRecords,
  };



