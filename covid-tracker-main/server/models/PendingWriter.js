const mongoose = require('mongoose')

const pendingWriterSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('pendingWriter', pendingWriterSchema)