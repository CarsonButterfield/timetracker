const User = require('./User')
const Project = require('./Project')
const mongoose = require('mongoose')
const Timestamp = require('./Timestamp')
const DB_URL = "mongodb://localhost:27017/timetracker";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

module.exports = {
    User,
    Project,
    Timestamp,
    test:'beep beep'
}