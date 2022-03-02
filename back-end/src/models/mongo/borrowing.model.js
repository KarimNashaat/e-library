const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const findOrCreate = require('mongoose-findorcreate')

const BorrowingSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    borrowingDate: {
        type: String,
        required: true
    },
    returningDate: {
        type: String,
        required: true
    },
    returnedOn: {
        type: String,
    }
})

const Borrowing = mongoose.model('Borrowing', BorrowingSchema)

module.exports = Borrowing