const mongoose = require('mongoose')
const { phone } = require('../schemas')

module.exports = mongoose.model('Phone', phone)