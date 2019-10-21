const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const UserSchema = new Schema({
    userName:String,
    projets: [Project],
    password:String,
    email:String,
})

module.exports = mongoose.model('User',UserSchema)

