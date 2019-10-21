const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const Project = new Schema({
    projectName:String,
    companyName:String,
    description:String,
    startDate: Date,
    payRate: Number,
    currency:String,
    extraHoursTime:Number,
    extraHoursPayRate:Number,
    timeLimitNumber:Number,
    timeLimitUnit:String,
    workingTime: [WorkHours]
}) 