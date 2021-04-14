const { Schema } = require('mongoose') 

module.exports = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    screen_size: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    release_date: { type: Date },
})