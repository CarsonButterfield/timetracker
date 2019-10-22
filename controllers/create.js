const mongoose = require('mongoose')
const db = require('../models');
console.log('beep')

const newProject = (req,res) => {
    if(!req.session.currentUser){
        res.json({
            status:400,
            data:"You are not logged in"
        })
        return
    }
    let newProject = req.body.data 
    console.log(newProject)
    
}


module.exports = {
    newProject,
}