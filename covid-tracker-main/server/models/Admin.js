const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('admin', AdminSchema)