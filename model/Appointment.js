const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: Number,
    date: Date,
    time: String,
    finished: Boolean,
})

module.exports = mongoose.model('appointment', Appointment)