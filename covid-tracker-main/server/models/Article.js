const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "https://www.bing.com/images/search?q=Covid&FORM=IQFRBA&id=03CA15D3EBE1F7DD39B9DC9BE2959FC82824EF4E"
    },
    itemList: {
        type: [String],
        requiuired: true,
    },
    items: {
        type: Map,
        of: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('article', articleSchema)