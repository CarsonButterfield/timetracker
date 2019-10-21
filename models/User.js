const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Projects = require('./Project');

const UserSchema = new Schema({
    userName:String,
    projects: [Projects.schema],
    password:String,
    email:String,
})

module.exports = mongoose.model('User',UserSchema)

