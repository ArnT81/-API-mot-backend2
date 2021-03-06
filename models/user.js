const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    homepage: {
        type: String,
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    }
})

module.exports = mongoose.model('Users', usersSchema)