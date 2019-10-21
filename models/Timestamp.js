const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TimeStampSchema = new Schema({
    startTime:Date,
    endTime:Date,
    projectTopic:String,
    day:Date,
})

module.exports = mongoose.model('Timestamp',TimeStampSchema)