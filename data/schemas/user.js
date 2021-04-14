const { Schema } = require('mongoose')
const { types: { userTypes } } = require('cellit-commons')

module.exports = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isLogedIn: { type: Boolean, required: true, default: false },
    userType: { type: String, required: true, enum: Object.values(userTypes), default: userTypes.customer }
})