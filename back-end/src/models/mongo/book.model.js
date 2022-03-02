const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const findOrCreate = require('mongoose-findorcreate')

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book