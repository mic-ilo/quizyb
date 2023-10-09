const mongoose = require('mongoose')

//1. Creating schema

const schema = new mongoose.Schema({
    _id: String,
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    isActive: Boolean,
    role: String //builder & player
})

//2. connect to a specific collect
const UserModel = mongoose.model('users', schema)

//3. export model so it can be used

module.exports = UserModel;